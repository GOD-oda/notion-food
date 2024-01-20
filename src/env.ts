import 'dotenv/config'

interface Environment {
  NOTION_TOKEN: string
  YAKINIKU_DATABASE_ID: string
  SUSHI_DATABASE_ID: string;
}

export const env: Environment = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || '',
  YAKINIKU_DATABASE_ID: process.env.YAKINIKU_DATABASE_ID || '',
  SUSHI_DATABASE_ID: process.env.SUSHI_DATABASE_ID || ''
}