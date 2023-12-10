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
exports.Book = void 0;
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
const react_1 = __importStar(require("react"));
const contentful = __importStar(require("contentful"));
require("../index.css");
const Description_1 = require("./Description");
const RelatedBooks_1 = require("./RelatedBooks");
const client = contentful.createClient({
    space: "lnflsi90e8vx", // "<space_id>",
    environment: "master", //"<environment_id>", // defaults to 'master' if not set
    accessToken: "ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ", //"<content_delivery_api_key>",
});
const Book = ({ author, title, photo, genre, id, showRelated }) => {
    const [showDescription, setShowDescription] = (0, react_1.useState)(false);
    const [relatedIDs, setRelatedIDs] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        function convertData(data) {
            const bookArray = data.map((item) => {
                return {
                    title: item,
                    author: item,
                    sys: { id: item.sys.id },
                };
            });
            return bookArray;
        }
        const handleGetRelated = () => {
            client
                .getEntry(id)
                .then((data) => {
                const dataArr = convertData(data.fields.relatedBooks);
                setRelatedIDs(dataArr.map((book) => book.sys.id));
            })
                .catch((err) => {
                console.log(err);
            });
        };
        if (showRelated)
            handleGetRelated();
    }, [showRelated, id]);
    return (react_1.default.createElement("div", { className: "book_section" },
        react_1.default.createElement("div", { className: "book", onClick: () => {
                setShowDescription(true);
            } },
            react_1.default.createElement("div", { className: "leftSection" },
                react_1.default.createElement("img", { src: photo.url, alt: `Book image ${title} of ${author.firstName} ${author.lastName} `, className: "bookImage" })),
            react_1.default.createElement("div", { className: "rightSection" },
                react_1.default.createElement("p", { className: "title" }, title),
                react_1.default.createElement("p", { className: "author" }, `${author.firstName} ${author.lastName}`),
                react_1.default.createElement("p", { className: "genre" }, genre)),
            showDescription && (react_1.default.createElement(Description_1.Description, { id: id, handleClose: (event) => {
                    event.stopPropagation();
                    setShowDescription(false);
                } }))),
        showRelated && react_1.default.createElement(RelatedBooks_1.RelatedBooks, { relatedIDs: relatedIDs })));
};
exports.Book = Book;
