"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateClients = generateClients;
const openapi_ts_1 = require("@hey-api/openapi-ts");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generateClients(services) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const service of services) {
            yield (0, openapi_ts_1.createClient)({
                client: '@hey-api/client-axios',
                input: service.input,
                output: service.output,
                plugins: [
                    '@tanstack/react-query',
                ]
            });
            console.log(`Client generated for ${service.input} with prefix ${service.prefix}`);
            const clientFilePath = path_1.default.resolve(service.output, 'services.gen.ts');
            let fileContent = fs_1.default.readFileSync(clientFilePath, 'utf-8');
            fileContent = fileContent.replace(/url: '\/api\/v\{version\}/g, `url: '${service.prefix}`);
            fs_1.default.writeFileSync(clientFilePath, fileContent, 'utf-8');
            console.log(`Prefix added to client file for ${service.input}`);
        }
    });
}
