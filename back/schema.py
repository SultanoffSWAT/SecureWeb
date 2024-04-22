from pydantic import BaseModel, ConfigDict


class SignInRequest(BaseModel):
    email: str
    password: str


class SignUpRequest(BaseModel):
    name: str
    email: str
    password: str
    recaptcha: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str


class CurrentUser(BaseModel):
    name: str
    email: str


class BaseCourse(BaseModel):
    title: str
    secondary_title: str
    image: str
    price: float

    class Config:
        from_attributes = True


class Course(BaseCourse):
    id: int


class CreateCourse(BaseCourse):
    pass


class BaseLesson(BaseModel):
    title: str
    secondary_title: str
    video: str
    course_id: int

    class Config:
        from_attributes = True


class Lesson(BaseLesson):
    id: int


class CreateLesson(BaseLesson):
    pass


class RecaptchaData(BaseModel):
    recaptcha_response: str
