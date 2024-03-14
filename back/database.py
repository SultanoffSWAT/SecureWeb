from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from secret import DATABASE_URL

engine = create_engine(DATABASE_URL)
session = Session(engine)

Base = declarative_base()
