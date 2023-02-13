FROM node:18

WORKDIR /usr/src/app

COPY . /app

EXPOSE 8080

CMD ["node", "main"]
