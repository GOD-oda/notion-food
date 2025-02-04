"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantTypes = exports.Restaurant = void 0;
class Restaurant {
    constructor(name, area, link, type) {
        this.NAME = name;
        this.Area = area;
        this.LINK = link;
        this.TYPE = type;
    }
    toMultiSelectArea() {
        return this.Area.slice(0, 2).map(name => ({ name }));
    }
}
exports.Restaurant = Restaurant;
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
exports.restaurantTypes = [
    'SUSHI',
    'YAKINIKU',
    'OKONOMIYAKI',
    'TONKATSU',
];
