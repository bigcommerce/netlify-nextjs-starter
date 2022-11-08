declare module 'node-bigcommerce' {
  type Config = Partial<{
    clientId: string;
    accessToken: string;
    storeHash: string;
    apiVersion: string;
    responseType: string;
  }>;

  export default class BigCommerce {
    constructor(config: Config);

    get<Response = unknown>(path: string, params?: object): Promise<Response>;
    post<Response = unknown, Request = unknown>(path: string, body?: Request): Promise<Response>;
  }
}
