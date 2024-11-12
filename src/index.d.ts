declare module 'heyapi-client-generator' {
    export interface ServiceConfig {
      prefix: string;
      input: string;
      output: string;
    }
  
    export function generateClients(services: ServiceConfig[]): Promise<void>;
  }
  