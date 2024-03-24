from pydantic import BaseModel


class SignInRequest(BaseModel):
    email: str
    password: str


class SignUpRequest(BaseModel):
    name: str
    email: str
    password: str


class CurrentUser(BaseModel):
    name: str
    email: str


class BaseCourse(BaseModel):
    title: str
    secondary_title: str
    image: str
    price: str


class Course(BaseCourse):
    id: int


class CreateCourse(BaseCourse):
    pass


class BaseLesson(BaseModel):
    title: str
    secondary_title: str
    video: str


class Lesson(BaseLesson):
    id: int


class CreateLesson(BaseLesson):
    pass
