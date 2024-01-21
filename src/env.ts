import 'dotenv/config'

interface Environment {
  NOTION_TOKEN: string
  DATABASE_ID: string
}

export const env: Environment = {
  NOTION_TOKEN: process.env.NOTION_TOKEN || '',
  DATABASE_ID: process.env.DATABASE_ID || '',
}