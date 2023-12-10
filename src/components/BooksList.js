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
exports.BooksList = void 0;
const react_1 = __importStar(require("react"));
require("../index.css");
// import { Book } from "./Book";
const Book_1 = require("./Book");
const LibraryContext_1 = require("./LibraryContext");
const contentful = __importStar(require("contentful"));
const settingID = "7iNT7YaaVoZPbqx4MxBu0L";
const client = contentful.createClient({
    space: "lnflsi90e8vx", // "<space_id>",
    environment: "master", //"<environment_id>", // defaults to 'master' if not set
    accessToken: "ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ", //"<content_delivery_api_key>",
});
const BooksList = () => {
    const books = (0, react_1.useContext)(LibraryContext_1.LibraryContext);
    const [showRelated, setShowRelated] = (0, react_1.useState)(false);
    const handleGetSettings = () => {
        // client.getEntry("<entry_id>"); // asynchronous, returns promise
        client
            .getEntry(settingID)
            .then((data) => {
            setShowRelated(!!data.fields.showRelated);
        })
            .catch((err) => {
            console.log(err);
        }); // asynchronous, returns promise
    };
    (0, react_1.useEffect)(() => {
        handleGetSettings();
    }, []);
    return (react_1.default.createElement("div", { className: "list-container" }, books &&
        books.items.map((book) => (react_1.default.createElement(Book_1.Book, { author: book.author, title: book.title, photo: book.photo, genre: book.genre, id: book.sys.id, key: book.title, showRelated: showRelated })))));
};
exports.BooksList = BooksList;
