export class Restaurant {
  NAME: string;
  Area: string[];
  LINK: string;
  TYPE: RestaurantType;

  constructor(name: string, area: string[], link: string, type: RestaurantType) {
    this.NAME = name;
    this.Area = area;
    this.LINK = link;
    this.TYPE = type;
  }

  toMultiSelectArea() {
    return this.Area.slice(0, 2).map(name => ({ name }));
  }
}


// export type Restaurant = {
//   NAME: string;
//   Area: Array<string>;
//   LINK: string;
//   TYPE: RestaurantType;
// }

// export const Restaurant = {
//   from(name: string, area: Array<string>, link: string, type: RestaurantType): Restaurant {
//     return {
//       NAME: name,
//       Area: area,
//       LINK: link,
//       TYPE: type
//     }
//   },
//
//   toMultiSelectArea(restaurant: Restaurant) {
//     return restaurant.Area.slice(0, 2).map(name => ({ name }));
//   }
// }

export const restaurantTypes = [
  'SUSHI' ,
  'YAKINIKU',
  'OKONOMIYAKI',
  'TONKATSU',
] as const
export type RestaurantType = typeof restaurantTypes[number]


