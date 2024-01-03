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
const client_1 = require("@notionhq/client");
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const env_1 = require("./env");
function main() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const url = process.argv[2] || '';
        if (url.length < 1) {
            throw new Error('URLを指定してください');
        }
        const response = yield fetch(url);
        const body = yield response.text();
        const root = (0, node_html_parser_1.default)(body);
        const name = (_b = (_a = root.querySelector('h2 span')) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.trim();
        if (!name) {
            throw new Error('店名が取得できませんでした');
        }
        const address = ((_d = (_c = root.querySelector('.rstinfo-table__address span')) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.trim()) || '';
        const notion = new client_1.Client({
            auth: process.env.NOTION_TOKEN,
        });
        if (env_1.env.DATABASE_ID === '') {
            throw new Error('DATABASE_ID is not defined');
        }
        yield notion.pages.create({
            parent: {
                database_id: env_1.env.DATABASE_ID
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name
                            }
                        }
                    ]
                },
                Prefecture: {
                    select: {
                        name: address
                    }
                },
                // @ts-ignore
                Link: {
                    rich_text: [
                        {
                            text: {
                                content: url,
                                link: {
                                    url: url
                                }
                            },
                        }
                    ]
                }
            },
        });
    });
}
main();
