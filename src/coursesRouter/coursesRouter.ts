import {Router} from "express";
import {coursesRepository} from "../coursesRepository/courses-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";

export const coursesRouter = Router({})

const titleValidation = body('title').trim().isLength({
  min: 3,
  max: 10
}).withMessage('Title length should be from 3 to 10 symbols')

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

coursesRouter.post('/',
  titleValidation,
  inputValidationMiddleware,
  (req, res) => {
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

coursesRouter.put('/:id',
  titleValidation,
  inputValidationMiddleware,
  (req, res) => {
  const isUpdated = coursesRepository.updateCourse(+req.params.id, req.body.title);
  if(isUpdated) {
    const course =  coursesRepository.getCoursesById(+req.params.id)
    res.send(course)
  } else {
    res.sendStatus(404)
  }
})
