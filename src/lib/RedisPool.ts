import RedisClient from "ioredis";
import config from "../config";
import Redis from "./Redis";

class RedisPool extends Redis {
  private static _instance: RedisPool;
  private _pool: RedisClient[] = [];
  private _maxPoolSize: number;
  private _index = 0;

  constructor(url: string, maxPoolSize: number = 1) {
    super();
    this._maxPoolSize = maxPoolSize;
    this.setClient(url);
  }

  public static getInstance(): RedisPool {
    if (!RedisPool._instance) {
      RedisPool._instance = new RedisPool(
        config.redis.url,
        parseInt(config.redis.maxPoolSize)
      );
    }
    return RedisPool._instance;
  }

  public getClient(): RedisClient {
    this._index = this._index % this._maxPoolSize;
    return this._pool[this._index++];
  }

  private setClient(url: string): void {
    for (let i = 0; i < this._maxPoolSize; i++) {
      this._pool.push(this.createClient(url));
    }
  }
}

export default RedisPool;
