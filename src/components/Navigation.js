"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("../index.css");
const Navigation = () => {
    return (react_1.default.createElement("nav", { className: "box navigation" },
        react_1.default.createElement("ul", null,
            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "link" }, "Home"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/books", className: "link" }, "Books"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/authors", className: "link" }, "Authors"))));
};
exports.Navigation = Navigation;
