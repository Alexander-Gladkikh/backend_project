export type CoursesType = {
  id: number
  title: string
}

const db = {
  courses: <CoursesType[]> [
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'},
    {id: 3, title: 'automatic qa'},
    {id: 4, title: 'devops'},
  ]
}

const courses = db.courses;

export const coursesRepository = {
  async findCourses(title: string | null | undefined): Promise<CoursesType[]> {
    if(title) {
      return courses.filter(c => c.title.indexOf(title) > -1)
    }
    else {
      return courses
    }
  },

  async findCoursesById(id: number): Promise<CoursesType | null> {
    let course = courses.find(c => c.id === id)
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
    courses.push(newCourse)
    return newCourse
  },

  async updateCourse(id: number, title: string):Promise<boolean> {
    let course = courses.find(c => c.id === id)
    if(course)  {
      course.title = title
      return true
    } else {
      return false
    }
  },

  async deleteCourse(id: number): Promise<boolean> {
    for(let i = 0; i < courses.length; i++) {
      if(courses[i].id === id) {
        courses.splice(i, 1)
        return true
      }
    }
    return false
  }

}
