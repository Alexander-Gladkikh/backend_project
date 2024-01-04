const db = {
  courses: [
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'},
    {id: 3, title: 'automatic qa'},
    {id: 4, title: 'devops'},
  ]
}

export const coursesRepository = {
  findCourses(title: string | null | undefined) {
    if(title) {
      return db.courses.filter(c => c.title.indexOf(title) > -1)
    }
    else {
      return db.courses
    }
  },

  getCoursesById(id: number) {
    return db.courses.find(c => c.id === id)
  },

  createCourse(title: string) {
    const newCourse = {
      id: +(new Date()),
      title: title
    }
    db.courses.push(newCourse)
    return newCourse
  },

  updateCourse(id: number, title: string) {
    let course = db.courses.find(c => c.id === id)
    if(course)  {
      course.title = title
      return true
    } else {
      return false
    }
  },

  deleteCourse(id: number) {
    for(let i = 0; i < db.courses.length; i++) {
      if(db.courses[i].id === id) {
        db.courses.splice(i, 1)
        return true
      }
    }
    return false
  }

}
