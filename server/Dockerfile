FROM golang:1.23-alpine
 
COPY . /go

ENV DATABASE_FILE="example.db"
ENV CGO_ENABLED=1
RUN apk update && apk add --no-cache \
    build-base \
    sqlite-dev \
    bash

RUN go build

EXPOSE 8080

CMD ["./resourceflow"]
 
