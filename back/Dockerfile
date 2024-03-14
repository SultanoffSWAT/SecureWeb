# back/Dockerfile
FROM python:3.9

WORKDIR /code

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install alembic
RUN ls ./


ENV ALEMBIC_CONFIG=/back/alembic.ini

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]
