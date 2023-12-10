"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const react_1 = __importStar(require("react"));
const LibraryContext_1 = require("./LibraryContext");
require("../index.css");
const Author = ({ author, }) => {
    const books = (0, react_1.useContext)(LibraryContext_1.LibraryContext);
    return (react_1.default.createElement("div", { className: "book_section" },
        react_1.default.createElement("div", { className: "book" },
            react_1.default.createElement("div", { className: "leftSection author" },
                react_1.default.createElement("p", null, `${author.firstName} ${author.lastName}`),
                react_1.default.createElement("p", null, author.pseudonym && `${author.pseudonym}`)),
            react_1.default.createElement("ul", { className: "rightSection bookList" }, Object.values(books.items)
                .filter((item) => item.author.firstName === author.firstName)
                .map((book) => (react_1.default.createElement("li", { className: "title", key: book.title }, book.title)))))));
};
exports.Author = Author;
