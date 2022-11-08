interface Entry {
  title: string;
  header: HeaderEntity;
  seo: Record<string, string>;
  modular_blocks: UIComponentEntity[];
  locale: string;
}

interface Link {
  title: string;
  url: string;
}

// Only two types of components are defined but we can create as many as we
type UIComponentTypes = 'hero' | 'grid';

interface UIComponentEntity {
  component: UIComponentData;
}

interface UIComponentData {
  component_variant: string;
  component_type: UIComponentTypes;
  grid?: GridEntity;
}

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
