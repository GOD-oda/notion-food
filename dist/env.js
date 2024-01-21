"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    NOTION_TOKEN: process.env.NOTION_TOKEN || '',
    DATABASE_ID: process.env.DATABASE_ID || '',
};
