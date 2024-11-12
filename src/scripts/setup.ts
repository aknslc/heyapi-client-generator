import fs from 'fs';
import path from 'path';

// `generate-clients.ts` dosyasını oluşturma fonksiyonu
const createGenerateClientsFile = () => {
  const filePath = path.join(process.cwd(), 'generate-clients.ts');
  const content = `
    import { generateClients, ServiceConfig } from 'heyapi-client-generator';

    const services: ServiceConfig[] = [
      {
        prefix: '/api/v1/c',
        input: 'https://example.com/swagger/v1/swagger.json',
        output: 'src/client/cards'
      },
      {
        prefix: '/api/v1/i',
        input: 'https://example.com/swagger/v1/swagger.json',
        output: 'src/client/instruction'
      }
    ];

    generateClients({
      services,
      defaultOutput: 'src/client/default',
      defaultPrefix: '/api'
    });
  `;

  // Eğer dosya yoksa oluştur
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content.trim());
    console.log(`generate-clients.ts created.`);
  } else {
    console.log(`generate-clients.ts already exists.`);
  }
};

// `package.json` içindeki script'i güncelleme fonksiyonu
const updatePackageJson = () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  // package.json varsa güncelle
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // `generate-clients` script'ini ekleyin
    packageJson.scripts = {
      ...packageJson.scripts,
      "generate-clients": "tsx generate-clients.ts"
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`package.json updated with generate-clients script.`);
  } else {
    console.log(`package.json not found.`);
  }
};

// Fonksiyonları çalıştır
createGenerateClientsFile();
updatePackageJson();
