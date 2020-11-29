FROM node:14.15.1
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json /app
RUN npm i
COPY ./main.js /app
CMD ["nodejs", "main.js"]
