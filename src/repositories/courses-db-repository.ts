import {client} from "./db";

export type CoursesType = {
  id: number
  title: string
}

export const coursesRepository = {
  async findCourses(title: string | null | undefined): Promise<CoursesType[]> {
    if(title) {
      return await client.db("learningTutorial").collection<CoursesType>("courses").find({title: {$regex: title}}).toArray()
    }
    else {
      return await client.db("learningTutorial").collection<CoursesType>("courses").find({}).toArray()
    }
  },

  async findCoursesById(id: number): Promise<CoursesType | null> {
    let course = await client.db("learningTutorial").collection<CoursesType>("courses").findOne({id: id})
    if(course) {
      return course
    }else {
      return null
    }
  },

  async createCourse(title: string): Promise<CoursesType> {
    const newCourse = {
      id: +(new Date()),
      title: title
    }
      await client.db('learningTutorial').collection<CoursesType>('courses').insertOne(newCourse)
    return newCourse
  },

  async updateCourse(id: number, title: string):Promise<boolean> {
    const result = await client.db('learningTutorial').collection<CoursesType>('courses').updateOne({id:id},{title:title})
    return result.matchedCount === 1;
  },

  async deleteCourse(id: number): Promise<boolean> {
    const result = await client.db('learningTutorial').collection<CoursesType>('courses').deleteOne({id:id})
    return result.deletedCount === 1;
  }

}
