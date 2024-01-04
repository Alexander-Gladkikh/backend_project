const express = require('express');

const app = express()
const port = 8080;

app.use(express.json())

const db = {
  courses: [
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'},
    {id: 3, title: 'automatic qa'},
    {id: 4, title: 'devops'},
  ]
}

app.get('/', (req, res) => {
    res.send({message: 'Hello World'})
})

app.get('/courses', (req, res) => {
  let foundCourses = db.courses
    if(req.query.title) {
      foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1)
    }
    res.json(foundCourses)
})

app.get('/courses/:id', (req, res) => {
  const foundCourses = db.courses.find(c => c.id === +req.params.id);

  if(!foundCourses) {
    res.sendStatus(404);
    return
  }

  res.json(foundCourses)
})

app.post('/courses', (req, res) => {
  if(!req.body.title) {
    res.sendStatus(400);
    return
  }

  const createdCourse = {
    id: +(new Date()),
    title: req.body.title
  }
  db.courses.push(createdCourse)
  res.status(201).json(createdCourse)
})

app.delete('/courses/:id', (req, res) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id);

  res.sendStatus(204)
})

app.put('/courses/:id', (req, res) => {
  if(!req.body.title) {
    res.sendStatus(400);
    return
  }

  const foundCourse = db.courses.find(c => c.id === +req.params.id);

  if(!foundCourse) {
    res.sendStatus(404)
    return
  }

  foundCourse.title = req.body.title

  res.sendStatus(204)
})

app.listen(port, () => console.log(`App started in ${port} port`))
