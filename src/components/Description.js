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
exports.Description = void 0;
const react_1 = __importStar(require("react"));
const contentful = __importStar(require("contentful"));
const rich_text_types_1 = require("@contentful/rich-text-types");
const rich_text_react_renderer_1 = require("@contentful/rich-text-react-renderer");
const Description = ({ id, handleClose }) => {
    const [descriptionData, setDescriptionData] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const client = contentful.createClient({
        space: "lnflsi90e8vx", // "<space_id>",
        environment: "master", //"<environment_id>", // defaults to 'master' if not set
        accessToken: "ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ", //"<content_delivery_api_key>",
    });
    const handleGetRichText = () => {
        // client.getEntry("<entry_id>"); // asynchronous, returns promise
        client
            .getEntry(id)
            .then((data) => {
            console.log("description", data.fields.description, "type", typeof data.fields.description);
            console.log("data", data.fields.description);
            setDescriptionData(data.fields.description);
            setIsLoading(false);
        })
            .catch((err) => {
            console.log(err);
        }); // asynchronous, returns promise
    };
    const Bold = ({ children }) => (react_1.default.createElement("p", { style: { color: "#009900", fontWeight: "1000" } }, `bold: ${children}`));
    const Italic = ({ children }) => (react_1.default.createElement("p", { style: { color: "#000099", fontStyle: "italic" } }, `italic-style: ${children}`));
    const Text = ({ children, }) => (react_1.default.createElement("p", { className: "align-center ", style: { color: "#009999", textDecoration: "underline" } }, children));
    const options = {
        renderMark: {
            [rich_text_types_1.MARKS.BOLD]: (text) => react_1.default.createElement(Bold, null, text),
            [rich_text_types_1.MARKS.ITALIC]: (text) => react_1.default.createElement(Italic, null, text),
        },
        renderNode: {
            [rich_text_types_1.BLOCKS.PARAGRAPH]: (node, children) => {
                console.log("node", node, "children", children);
                return react_1.default.createElement(Text, null, children);
            },
        },
        renderText: (text) => text === null || text === void 0 ? void 0 : text.toString().replace("!", "?"),
    };
    (0, react_1.useEffect)(() => {
        setIsLoading(true);
        handleGetRichText();
    }, []);
    return (react_1.default.createElement("div", { className: "modal active", onClick: handleClose },
        react_1.default.createElement("div", { className: "modal content" },
            react_1.default.createElement("p", { className: "description" }, "Book Description"),
            !isLoading
                ? (0, rich_text_react_renderer_1.documentToReactComponents)(descriptionData, options)
                : "Loading...")));
};
exports.Description = Description;
