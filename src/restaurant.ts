export type Restaurant = {
  NAME: string;
  PREFECTURE: string;
  LINK: string;
  TYPE: RestaurantType;
}

export const Restaurant = {
  from(name: string, prefecture: string, link: string, type: RestaurantType): Restaurant {
    return {
      NAME: name,
      PREFECTURE: prefecture,
      LINK: link,
      TYPE: type
    }
  }
}

export const restaurantTypes = [
  'SUSHI' ,
  'YAKINIKU',
  'OKONOMIYAKI'
] as const
export type RestaurantType = typeof restaurantTypes[number]


