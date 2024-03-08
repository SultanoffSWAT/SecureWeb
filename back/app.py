from fastapi import FastAPI

app = FastAPI()


@app.get('courses')
def get_courses():
    pass
