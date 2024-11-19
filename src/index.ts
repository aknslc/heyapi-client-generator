import { createClient } from '@hey-api/openapi-ts';
import fs from 'fs';
import path from 'path';
import { ServiceConfig } from 'heyapi-client-generator';

export async function generateClients(services: ServiceConfig[]) {
    for (const service of services) {
        await createClient({
            client: service.client as any,
            input: service.input,
            output: service.output,
            plugins: service.plugins as any,
        });
        console.log(`Client generated for ${service.input} with prefix ${service.prefix}`);

        const clientFilePath = path.resolve(service.output, 'services.gen.ts');
        let fileContent = fs.readFileSync(clientFilePath, 'utf-8');

        fileContent = fileContent.replace(/url: '\/api\/v\{version\}/g, `url: '${service.prefix}`);

        fs.writeFileSync(clientFilePath, fileContent, 'utf-8');
        console.log(`Prefix added to client file for ${service.input}`);
    }
}