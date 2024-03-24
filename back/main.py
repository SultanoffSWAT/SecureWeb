from fastapi import FastAPI, Form, Depends, HTTPException, status

import schema
from database import session
from models import User
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from schema import SignInRequest, SignUpRequest
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "85034932-05c7-41cc-be54-aca55e756d72"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

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


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


@app.post("/sign-up/")
async def sign_up(request: SignUpRequest, db: session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        raise HTTPException(status_code=409, detail="Email already in use")

    hashed_password = get_password_hash(request.password)

    user = User(
        name=request.name,
        email=request.email,
        hashed_password=hashed_password,
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

