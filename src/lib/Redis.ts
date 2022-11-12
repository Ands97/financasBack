import RedisClient from "ioredis";
import { KeyValuePair } from "../app/types/Textensions";
import Helpers from "../utils/helpers/Helpers";
import Logger from "../utils/Logger";

abstract class Redis {
  protected abstract getClient(): RedisClient;

  protected createClient(url: string): RedisClient {
    if (!/redis:/.test(url)) {
      const urlParse = url.match(
        /(.*):(\d*){4,5}\?password=(.*)(?=&)(.*)/
      ) as RegExpMatchArray;
      const host = urlParse[1];
      const port = Number(urlParse[2]);
      const password = urlParse[3];

      Logger.debug("[Redis] tls params", { host, port, password });

      return new RedisClient({
        host,
        port,
        password,
        tls: { servername: host },
      });
    }
    return new RedisClient(url);
  }

  public async get<T>(key: string): Promise<T> {
    return Helpers.parseIfJson(await this.getClient().get(key));
  }

  public async set<T>(key: string, value: T): Promise<boolean> {
    return (await this.getClient().set(key, JSON.stringify(value))) === "OK";
  }

  public async setex<T>(key: string, value: T, ttl: number): Promise<boolean> {
    return (
      (await this.getClient().setex(key, ttl, JSON.stringify(value))) === "OK"
    );
  }

  public async hget<T>(key: string, field: string): Promise<T> {
    return await Helpers.parseIfJson(await this.getClient().hget(key, field));
  }

  public async hset<T>(key: string, field: string, value: T): Promise<boolean> {
    return (
      (await this.getClient().hset(
        key,
        field,
        Buffer.from(JSON.stringify(value))
      )) === 1
    );
  }

  public async hgetall<T>(key: string): Promise<T> {
    const data = await this.getClient().hgetall(key);

    let result: KeyValuePair<any> = {};

    for (let i in data) {
      result[i] = Helpers.parseIfJson(data[i]);
    }
    return result as T;
  }

  public async hmget<T>(key: string, fields: string[]): Promise<T> {
    const data = await this.getClient().hmget(key, ...fields);

    let result: KeyValuePair<any> = {};

    for (let i in data) {
      result[fields[i]] = Helpers.parseIfJson(data[i]);
    }
    return result as T;
  }

  public async hmset(key: string, value: object): Promise<boolean> {
    let result: KeyValuePair<any> = {};

    for (let i in value) {
      result[i] = JSON.stringify(value[i]);
    }

    return (await this.getClient().hmset(key, result)) === "OK";
  }

  public async increment(
    key: string,
    value: string | number
  ): Promise<boolean> {
    return (await this.getClient().incrby(key, value)) === 1;
  }

  public async expire(key: string, ttl: number): Promise<boolean> {
    return (await this.getClient().expire(key, ttl)) === 1;
  }

  public async del(key: string): Promise<boolean> {
    return (await this.getClient().del(key)) === 1;
  }

  public async exists(key: string): Promise<boolean> {
    return (await this.getClient().exists(key)) === 1;
  }

  public async sadd<T>(key: string, member: T): Promise<boolean> {
    return (await this.getClient().sadd(key, JSON.stringify(member))) === 1;
  }

  public async srem<T>(key: string, member: T): Promise<boolean> {
    return (await this.getClient().srem(key, JSON.stringify(member))) === 1;
  }

  public async smembers(key: string): Promise<string[]> {
    return await this.getClient().smembers(key);
  }

  public async zadd<T>(key: string, score: number, value: T): Promise<boolean> {
    return (
      (await this.getClient().zadd(key, score, JSON.stringify(value))) === 1
    );
  }

  public async zrem<T>(key: string, value: T): Promise<boolean> {
    return (await this.getClient().zrem(key, JSON.stringify(value))) === 1;
  }

  public async zrange(
    key: string,
    min: number,
    max: number
  ): Promise<string[]> {
    return await this.getClient().zrange(key, min, max);
  }

  public async scanStream(pattern: string): Promise<string[]> {
    let keysArray: any[] = [];

    const stream = this.getClient().scanStream({
      match: pattern,
    });

    return new Promise((res, rej) => {
      stream.on("data", (keys = []) => {
        for (let key of keys) {
          if (!keysArray.includes(key)) {
            keysArray.push(key);
          }
        }
      });
      stream.on("end", () => {
        res(keysArray);
      });
    });
  }

  public async publish<T>(channel: string, value: T): Promise<boolean> {
    return (
      (await this.getClient().publish(channel, JSON.stringify(value))) === 1
    );
  }

  public async subscribe(channel: string): Promise<void> {
    await this.getClient().subscribe(channel);
  }

  public registerCallback(callback: Function): void {
    this.getClient().on("message", (channel, message) => {
      callback(channel, message);
    });
  }
}

export default Redis;
