import { ICacheAccount } from "../app/interfaces/repositories/ICache";
import RedisPool from "../lib/RedisPool";

class Cache implements ICacheAccount {
  private readonly _client: RedisPool;

  constructor() {
    this._client = RedisPool.getInstance();
  }
}

export default Cache;
