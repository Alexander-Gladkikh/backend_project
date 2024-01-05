import {Router} from "express";
import {coursesRepository, CoursesType} from "../repositories/courses-db-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";

export const coursesRouter = Router({})

const titleValidation = body('title').trim().isLength({
  min: 3,
  max: 10
}).withMessage('Title length should be from 3 to 10 symbols')

coursesRouter.get('/', async (req, res) => {
  const foundCourses: CoursesType[] = await coursesRepository.findCourses(req.query.title?.toString())
  res.json(foundCourses)
})

coursesRouter.get('/:id', async(req, res) => {
  const foundCourses: CoursesType | null = await coursesRepository.findCoursesById(+req.params.id);
  if(!foundCourses) {
    res.sendStatus(404);
    return
  }
  res.json(foundCourses)
})

coursesRouter.post('/',
  titleValidation,
  inputValidationMiddleware,
  async (req, res) => {
  const createdCourse: CoursesType = await coursesRepository.createCourse(req.body.title)
  res.status(201).json(createdCourse)
})

coursesRouter.delete('/:id', async(req, res) => {
const isDeleted: boolean = await coursesRepository.deleteCourse(+req.params.id);
  if(isDeleted) {
   res.sendStatus(204)
  }  else {
    res.sendStatus(204)

}
})

coursesRouter.put('/:id',
  titleValidation,
  inputValidationMiddleware,
  async (req, res) => {
  const isUpdated: boolean = await coursesRepository.updateCourse(+req.params.id, req.body.title);
  if(isUpdated) {
    const course =  await coursesRepository.findCoursesById(+req.params.id)
    res.send(course)
  } else {
    res.sendStatus(404)
  }
})
