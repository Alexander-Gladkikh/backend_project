import {Router} from "express";
import {coursesRepository} from "../coursesRepository/courses-repository";

export const coursesRouter = Router({})



coursesRouter.get('/', (req, res) => {
  const foundCourses = coursesRepository.findCourses(req.query.title?.toString())
  res.json(foundCourses)
})

coursesRouter.get('/:id', (req, res) => {
  const foundCourses = coursesRepository.getCoursesById(+req.params.id);

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
const createdCourse = coursesRepository.createCourse(req.body.title)

  res.status(201).json(createdCourse)
})

coursesRouter.delete('/:id', (req, res) => {
const isDeleted = coursesRepository.deleteCourse(+req.params.id);
  if(isDeleted) {
   res.sendStatus(204)
  }  else {
    res.sendStatus(204)

}
})

coursesRouter.put('/:id', (req, res) => {
  const isUpdated = coursesRepository.updateCourse(+req.params.id, req.body.title);
  if(isUpdated) {
    const course =  coursesRepository.getCoursesById(+req.params.id)
    res.send(course)
  } else {
    res.sendStatus(404)
  }
})
