export interface ITokenStore {
  set(key: string, value: string): Promise<void>;
}