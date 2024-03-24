export class Lesson{
  id: number
  title: String
  secondary_title: String
  video: String
  course_id: number

  constructor(id?: number, title?: String, secondary_title?: String, video?: String, course_id?: number) {
    this.id = 0
    this.title = ''
    this.secondary_title = ''
    this.video = ''
    this.course_id = 0

    if(id && title && secondary_title && video && course_id){
      this.id = id
      this.title = title;
      this.secondary_title = secondary_title
      this.video = video
      this.course_id = course_id
    }
  }
}
