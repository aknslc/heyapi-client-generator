import { createClient } from '@hey-api/openapi-ts';
import fs from 'fs';
import path from 'path';

export interface ServiceConfig {
    prefix?: string;
    input: string;
    output?: string;
}

export interface GeneratorConfig {
    services: ServiceConfig[];
    defaultPrefix: string;
    defaultOutput: string;
}

export async function generateClients({
    services,
    defaultOutput = 'src/client',
    defaultPrefix = '/api',
}: GeneratorConfig) {
    for (const service of services) {
        const output = service.output || defaultOutput;
        const prefix = service.prefix || defaultPrefix;

        await createClient({
            client: '@hey-api/client-axios',
            input: service.input,
            output,
            plugins: ['@tanstack/react-query'],
        });

        const clientFilePath = path.resolve(output, 'services.gen.ts');
        let fileContent = fs.readFileSync(clientFilePath, 'utf-8');
        fileContent = fileContent.replace(/url: '\/api\/v\{version\}/g, `url: '${prefix}`);
        fs.writeFileSync(clientFilePath, fileContent, 'utf-8');
    }
}
