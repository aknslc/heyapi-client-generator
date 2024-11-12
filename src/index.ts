import { createClient } from '@hey-api/openapi-ts';
import fs from 'fs';
import path from 'path';

export interface ServiceConfig {
    prefix: string;
    input: string;
    output: string;
}

export async function generateClients(services: ServiceConfig[]) {
    for (const service of services) {
        await createClient({
            client: '@hey-api/client-axios',
            input: service.input,
            output: service.output,
            plugins: [
                '@tanstack/react-query',
            ]
        });
        console.log(`Client generated for ${service.input} with prefix ${service.prefix}`);

        const clientFilePath = path.resolve(service.output, 'services.gen.ts');
        let fileContent = fs.readFileSync(clientFilePath, 'utf-8');

        fileContent = fileContent.replace(/url: '\/api\/v\{version\}/g, `url: '${service.prefix}`);

        fs.writeFileSync(clientFilePath, fileContent, 'utf-8');
        console.log(`Prefix added to client file for ${service.input}`);
    }
}