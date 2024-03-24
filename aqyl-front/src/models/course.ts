export class Course {
  id: number
  title: String
  secondary_title: String
  image: String
  price: number

  constructor(id: number, title: String, secondary_title: String, image: String, price: number) {
    this.id  =id
    this.title = title
    this.image = image
    this.secondary_title = secondary_title
    this.price = price
  }
}
