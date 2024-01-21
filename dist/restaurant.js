"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantTypes = exports.Restaurant = void 0;
exports.Restaurant = {
    from(name, prefecture, link, type) {
        return {
            NAME: name,
            PREFECTURE: prefecture,
            LINK: link,
            TYPE: type
        };
    }
};
exports.restaurantTypes = [
    'SUSHI',
    'YAKINIKU',
    'OKONOMIYAKI'
];
