FROM mhart/alpine-node:4.2.1

WORKDIR /src
RUN npm install -g npm@latest
ADD package.json package.json
RUN mkdir -p /src/frontend
ADD frontend/package.json frontend/package.json

RUN apk add --update make gcc g++ python git

RUN npm install;
RUN cd frontend;npm install;
#RUN cd frontend;SKIP_SASS_BINARY_DOWNLOAD_FOR_CI=true npm install node-sass@beta

ADD . .
EXPOSE 3000
CMD STATIC=true npm start
