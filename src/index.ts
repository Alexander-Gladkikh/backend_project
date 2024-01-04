import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import {coursesRouter} from "./coursesRouter/coursesRouter";

const app = express()
const port = process.env.PORT || 5000;

const parserMiddleware = bodyParser({})

app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send({message: 'Hello World'})
})

app.use('/courses', coursesRouter)


app.listen(port, () => console.log(`App started in ${port} port`))
