import { generateClients, ServiceConfig } from "heyapi-client-generator";

const services: ServiceConfig[] = [
    {
        prefix: "/api/v1/pre-example",
        input: "./openapi.json",
        output: "src/client/pre-example",
    },
    {
        prefix: "/api/v1/pre-example2",
        input: "./openapi.json",
        output: "src/client/pre-example2",
    },
];

generateClients(services)
    .then(() => console.log("Clients successfully generated!"))
    .catch((err) => console.error("Error generating clients:", err));
