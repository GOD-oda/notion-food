import {Client} from "@notionhq/client";
import parse from "node-html-parser";
import {env} from "./env";

async function main() {
  const url = process.argv[2] || ''
  if (url.length < 1) {
    throw new Error('URLを指定してください')
  }

  const response = await fetch(url);
  const body = await response.text()
  const root = parse(body)
  const name = root.querySelector('h2 span')?.text?.trim()
  if (!name) {
    throw new Error('店名が取得できませんでした')
  }
  const address = root.querySelector('.rstinfo-table__address span')?.text?.trim() || ''

  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  if (env.DATABASE_ID === '') {
    throw new Error('DATABASE_ID is not defined')
  }

  await notion.pages.create({
    parent: {
      database_id: env.DATABASE_ID
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
  })
}

main()
