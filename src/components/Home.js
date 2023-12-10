"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const react_1 = __importDefault(require("react"));
require("../index.css");
// import lib from "./../assets/istockphoto-949118068-612x612.jpg";
const hero1_1_basement_stacks_books3_jpg_1 = __importDefault(require("./../assets/hero1-1-basement_stacks_books3.jpg"));
const Home = () => {
    return (react_1.default.createElement("div", { className: "box" },
        react_1.default.createElement("img", { src: hero1_1_basement_stacks_books3_jpg_1.default, alt: "", style: { width: "96%", padding: "1rem" } })));
};
exports.Home = Home;
