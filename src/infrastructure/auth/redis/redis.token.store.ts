import { RedisClientType } from "redis";
import { ITokenStore } from "../../../domain/services/itoken-store";

export class RedisTokenStore implements ITokenStore {
  constructor (private client: RedisClientType){}
  
  async set(key: string, value: string): Promise<void>{
    await this.client.set(key, value);
  }
}