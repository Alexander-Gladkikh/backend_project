import express from 'express';
import bodyParser from "body-parser";
import {coursesRouter} from "./coursesRouter/coursesRouter";
import {runDb} from "./repositories/db";

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json())

app.use('/courses', coursesRouter)

const startApp = async () => {
  await runDb()
  app.listen(port, () => console.log(`App started in ${port} port`))
}

startApp()

