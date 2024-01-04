import {Router} from "express";

export const coursesRouter = Router({})

const db = {
  courses: [
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'},
    {id: 3, title: 'automatic qa'},
    {id: 4, title: 'devops'},
  ]
}

coursesRouter.get('/', (req, res) => {
  let foundCourses = db.courses
  if(req.query.title) {
    foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1)
  }
  res.json(foundCourses)
})

coursesRouter.get('/:id', (req, res) => {
  const foundCourses = db.courses.find(c => c.id === +req.params.id);

  if(!foundCourses) {
    res.sendStatus(404);
    return
  }

  res.json(foundCourses)
})

coursesRouter.post('/', (req, res) => {
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

coursesRouter.delete('/:id', (req, res) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id);

  res.sendStatus(204)
})

coursesRouter.put('/:id', (req, res) => {
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
