declare module 'heyapi-client-generator' {
  export interface ServiceConfig {
    prefix: string;
    client: string;
    input: string;
    output: string;
    plugins?: string[];
  }

  export function generateClients(services: ServiceConfig[]): Promise<void>;
}