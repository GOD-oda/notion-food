import {Client} from "@notionhq/client";
import parse from "node-html-parser";
import {env} from "./env";

async function main() {
  const types = {
    'SUSHI': env.SUSHI_DATABASE_ID,
    'YAKINIKU': env.YAKINIKU_DATABASE_ID
  }

  const type = process.argv[2] || ''
  const typeKeys = Object.keys(types)
  if (type.length < 1) {
    throw new Error(`Please specify the type. The types that can be specified are as follows. [ ${typeKeys.join(' ')} ]`)
  }

  if (!typeKeys.includes(type)) {
    throw new Error(`The types that can be specified are as follows. [ ${typeKeys.join(' ')} ]`)
  }

  // @ts-ignore
  const databaseId = types[type]

  const url = process.argv[3] || ''
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

  await notion.pages.create({
    parent: {
      database_id: databaseId
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
