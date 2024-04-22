from fastapi import FastAPI, Form, Depends, HTTPException, status

import models
import schema
from roles import UserRole
from secret import RECAPTCHA_SECRET_KEY
from database import session
from models import User
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from schema import SignInRequest, SignUpRequest
from jose import jwt
from datetime import datetime, timedelta
from sqlalchemy import select
import httpx
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Security, HTTPException

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

SECRET_KEY = "85034932-05c7-41cc-be54-aca55e756d72"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = session
    try:
        yield db
    finally:
        db.close()


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@app.post("/token", response_model=schema.Token)
async def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db: session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def get_current_user(token: str = Depends(oauth2_scheme), db: session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schema.TokenData(email=email)
    except jwt.JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user


def get_current_active_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN.value:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user




@app.get("/users/")
def read_users(db: session = Depends(get_db), current_user: User = Depends(get_current_active_admin)):
    users = db.query(User).all()
    return users


@app.post("/users/{user_id}/delete")
def delete_user(user_id: int, db: session = Depends(get_db), current_user: User = Depends(get_current_active_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}


async def verify_recaptcha(recaptcha_token: str):
    print(recaptcha_token)
    payload = {
        'secret': RECAPTCHA_SECRET_KEY,
        'response': recaptcha_token
    }
    url = "https://www.google.com/recaptcha/api/siteverify"

    async with httpx.AsyncClient() as client:
        response = await client.post(url, data=payload)

    recaptcha_verification = response.json()

    if recaptcha_verification.get("success"):
        return True
    else:
        raise HTTPException(status_code=400, detail="Invalid reCAPTCHA.")


@app.post("/sign-up/")
async def sign_up(request: SignUpRequest, db: session = Depends(get_db)):
    # if not await verify_recaptcha(request.recaptcha):
    #     raise HTTPException(status_code=409, detail="RECAPTCHA not verified")

    user = db.query(User).filter(User.email == request.email).first()
    if user:
        raise HTTPException(status_code=409, detail="Email already in use")

    hashed_password = get_password_hash(request.password)

    user = User(
        name=request.name,
        email=request.email,
        hashed_password=hashed_password,
        role=UserRole.USER.value
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User created successfully"}


@app.post("/sign-in/")
async def sign_in(request: SignInRequest, db: session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Please, double check your email")
    if not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Please, double check your password")

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/user/{request}")
async def get_user_by_email(request: str, db: session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == request).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user = {
        'name': db_user.name,
        'email': db_user.email
    }
    print(user)
    return user


@app.get("/users")
async def get_users(db: session = Depends(get_db)):
    db_users = db.execute(select(models.User)).scalars().all()
    users = [schema.CurrentUser(name=user.name, email=user.email) for user in db_users]
    return users


@app.post("/courses")
def add_course(request: schema.CreateCourse, db: session = Depends(get_db)):
    db.add(models.Course(**request.model_dump()))
    db.commit()
    db.close()
    return request


@app.get("/courses")
def get_courses(db: session = Depends(get_db)):
    db_courses = db.execute(select(models.Course)).scalars().all()
    courses = [schema.Course.model_validate(course) for course in db_courses]
    return courses


@app.get("/courses/{request}")
def get_course_by_id(request: int, db: session = Depends(get_db)):
    db_course = db.get(models.Course, request)
    course = schema.Course.model_validate(db_course)
    return course


@app.get("/courses/{request}/lessons")
def get_course_lessons(request: int, db: session = Depends(get_db)):
    db_course = db.get(models.Course, request)
    db_lessons = db_course.lessons
    lessons = [schema.Lesson.model_validate(lesson) for lesson in db_lessons]
    return lessons


@app.post("/lessons")
def add_lesson_to_course(request: schema.CreateLesson, db: session = Depends(get_db)):
    db.add(models.Lesson(**request.model_dump()))
    db.commit()
    db.close()
    return request
