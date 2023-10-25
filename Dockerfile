FROM node:16.20.1 as build-env
WORKDIR /app
COPY ["package.json","package-lock.json","/app/"]
RUN npm install
RUN npm install -g @angular/cli

COPY . /app
RUN ng build
CMD ng serve --host 0.0.0.0 --port 4200