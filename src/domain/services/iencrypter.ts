export interface IEncrypter {
  hash(plain: string): Promise<string>;
  compare(raw: string, hashed: string): Promise<boolean>;
}
