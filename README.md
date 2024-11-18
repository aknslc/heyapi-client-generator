# **HeyAPI Client Generator**

> A utility to generate TypeScript clients for APIs using HeyAPI, enhanced with prefix configuration and React Query integration.

---

## **Features**

- 🚀 Automatically generates TypeScript clients from OpenAPI specifications.
- 🌟 Adds prefix configurations dynamically to API endpoints.
- 🔧 Includes built-in React Query plugin integration for easy state management.

---

## **Installation**

```bash
pnpm add heyapi-client-generator
```

## **Usage**

To use this package, follow these steps:

1. Create a generate-clients.ts File
   In your project's root directory, create a generate-clients.ts file and add the following code:

```typescript
import { generateClients, ServiceConfig } from "@heyapi-client-generator";

const services: ServiceConfig[] = [
  {
    prefix: "/api/v1",
    input: "./path-to-your-openapi-spec.json",
    output: "./generated/client",
  },
];

generateClients(services)
  .then(() => console.log("Clients successfully generated!"))
  .catch((err) => console.error("Error generating clients:", err));
```

2. Add a Script to Your package.json
   Update your package.json file to include the following script:



Make sure tsx is installed in your project:
```bash
pnpm add tsx typescript -D
```
```json
"scripts": {
  "generate": "tsx generate-clients.ts"
}
```


3. Run the Script
   Generate the clients by running the following command in your terminal:

```bash
pnpm run generate
```

## **How It Works**

**Client Generation:**
The generate-clients script reads the ServiceConfig array, processes each service configuration, and generates TypeScript clients using the HeyAPI OpenAPI client generator.

**Custom Prefix Handling:**
After generating the client, the script modifies the client file to prepend the specified prefix to all API endpoint URLs.

**React Query Integration:**
The generated clients include React Query hooks for managing API state seamlessly in your application.

**ServiceConfig Interface**

```typescript
interface ServiceConfig {
  prefix: string;
  input: string;
  output: string;
}
```

| Property | Type     | Description                                            |
| :------- | :------- | :----------------------------------------------------- |
| `prefix` | `string` | The prefix to prepend to the API URLs                  |
| `input`  | `string` | Path to the OpenAPI specification file                 |
| `output` | `string` | Directory where the generated client files will reside |

**GitHub Repository**
For more details, check out the GitHub repository: [heyapi-client-generator](https://github.com/aknslc/heyapi-client-generator)

**Contributing**
We welcome contributions! Follow these steps to contribute:

- Fork the repository.
- Clone it to your machine:

```bash
git clone https://github.com/aknslc/heyapi-client-generator.git
```
Create a new branch for your changes.
- Make your changes and test them.
- Submit a pull request.
    