import parse from "node-html-parser";
import {env} from "./env";
import {notion} from "./client";
import {Restaurant, RestaurantType, restaurantTypes} from "./restaurant";

async function main() {
  const type = process.argv[2] || ''
  if (type.length < 1) {
    throw new Error(`Please specify the type. The types that can be specified are as follows. [ ${restaurantTypes.join(' ')} ]`)
  }

  // NOTE: parse可能なURLは食べログのみ
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
  const prefecture = root.querySelector('.rstinfo-table__address span')?.text?.trim() || ''
  const restaurant = Restaurant.from(name, prefecture, url, type as RestaurantType)

  await notion.pages.create({
    parent: {
      database_id: env.DATABASE_ID
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
      Prefecture: {
        select: {
          name: restaurant.PREFECTURE
        }
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
  })
}

main()
