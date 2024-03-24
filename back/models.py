from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped
from typing import Annotated
import sqlalchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base

_id = Annotated[int, mapped_column(sqlalchemy.Integer, primary_key=True)]

class User(Base):
    __tablename__ = 'users'

    id: Mapped[_id]
    name: Mapped[str]
    email: Mapped[str] = mapped_column(String, unique=True)
    hashed_password: Mapped[str]


class Course(Base):
    __tablename__ = 'courses'

    id: Mapped[_id]
    title: Mapped[str]
    secondary_title: Mapped[str]
    image: Mapped[str]
    price: Mapped[float]

    lessons: Mapped[list['Lesson']] = relationship(back_populates='course')


class Lesson(Base):
    __tablename__ = 'lessons'

    id: Mapped[_id]
    title: Mapped[str]
    secondary_title: Mapped[str]
    video: Mapped[str]
    course_id: Mapped[int] = mapped_column(ForeignKey('courses.id'))

    course: Mapped['Course'] = relationship(back_populates='lessons')
