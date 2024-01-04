"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const coursesRouter_1 = require("./coursesRouter/coursesRouter");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, body_parser_1.default)());
app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});
app.use('/courses', coursesRouter_1.coursesRouter);
app.listen(port, () => console.log(`App started in ${port} port`));
