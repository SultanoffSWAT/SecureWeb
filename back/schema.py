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

