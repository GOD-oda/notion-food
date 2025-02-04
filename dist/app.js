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
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const env_1 = require("./env");
const client_1 = require("./client");
const restaurant_1 = require("./restaurant");
function main() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const type = process.argv[2] || '';
        if (type.length < 1) {
            throw new Error(`Please specify the type. The types that can be specified are as follows. [ ${restaurant_1.restaurantTypes.join(' ')} ]`);
        }
        // NOTE: parse可能なURLは食べログのみ
        const url = process.argv[3] || '';
        if (url.length < 1) {
            throw new Error('URLを指定してください');
        }
        const response = yield fetch(url);
        const body = yield response.text();
        const root = (0, node_html_parser_1.default)(body);
        // レストラン名
        const name = (_b = (_a = root.querySelector('h2 span')) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.trim();
        if (!name) {
            throw new Error('店名が取得できませんでした');
        }
        // エリア
        const spans = Array.from(root.querySelectorAll('.rstinfo-table__address span a'));
        const areaTexts = spans.map(span => span.text.trim());
        const restaurant = new restaurant_1.Restaurant(name, areaTexts, url, type);
        yield client_1.notion.pages.create({
            parent: {
                database_id: env_1.env.DATABASE_ID
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: restaurant.NAME
                            }
                        }
                    ]
                },
                Area: {
                    multi_select: restaurant.toMultiSelectArea()
                },
                // @ts-ignore
                Link: {
                    rich_text: [
                        {
                            text: {
                                content: restaurant.LINK,
                                link: {
                                    url: restaurant.LINK
                                }
                            },
                        }
                    ]
                },
                Type: {
                    select: {
                        name: restaurant.TYPE
                    }
                },
            },
        });
    });
}
main();
