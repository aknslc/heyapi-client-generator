import { generateClients, ServiceConfig } from "heyapi-client-generator";

const services: ServiceConfig[] = [
    {
        prefix: "/api/v1/pre-example",
        client: "@hey-api/client-axios",
        input: "./openapi.json",
        output: "src/client/pre-example",
        plugins: ["@tanstack/react-query",],
    },
    {
        prefix: "/api/v1/pre-example2",
        client: "@hey-api/client-fetch",
        input: "./openapi.json",
        output: "src/client/pre-example2",
    },
];

generateClients(services)
    .then(() => console.log("Clients successfully generated!"))
    .catch((err) => console.error("Error generating clients:", err));
