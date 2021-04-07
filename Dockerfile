# Nodejs Base image
FROM node:14.15.4
WORKDIR /app
# install and app dependencies
COPY angular/package.json ./
RUN npm install
RUN npm install -g @angular/cli
# add app
COPY angular .
# start app
CMD ng serve --host 0.0.0.0