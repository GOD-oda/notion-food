"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notion = void 0;
const client_1 = require("@notionhq/client");
const env_1 = require("./env");
exports.notion = new client_1.Client({
    auth: env_1.env.NOTION_TOKEN,
});
