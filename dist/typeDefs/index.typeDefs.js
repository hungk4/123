"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const article_typeDefs_1 = require("./article.typeDefs");
const category_typeDefs_1 = require("./category.typeDefs");
const user_typeDef_1 = require("./user.typeDef");
exports.typeDefs = [
    article_typeDefs_1.typeDefsAticle,
    category_typeDefs_1.typeDefsCategory,
    user_typeDef_1.typeDefsUser
];
