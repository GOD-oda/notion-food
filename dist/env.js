"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    NOTION_TOKEN: process.env.NOTION_TOKEN || '',
    YAKINIKU_DATABASE_ID: process.env.YAKINIKU_DATABASE_ID || '',
    SUSHI_DATABASE_ID: process.env.SUSHI_DATABASE_ID || ''
};
