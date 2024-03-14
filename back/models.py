from sqlalchemy import Column, Integer, String
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
    email: Mapped[str]
    hashed_password: Mapped[str]
