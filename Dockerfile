# Dockerfile for running bf-gen server
FROM node:8
MAINTAINER uhyo
WORKDIR /service-bf-gen
# first, prepare denendencies of server.
COPY ./packages/bf-gen-server/package.json ./packages/bf-gen-server/package-lock.json ./packages/bf-gen-server/
RUN cd packages/bf-gen-server && npm install --production
# copy built assets.
COPY ./packages/bf-gen-server/config/ ./packages/bf-gen-server/config/
COPY ./packages/bf-gen-server/views/ ./packages/bf-gen-server/views/
COPY ./packages/bf-gen-server/dist/ ./packages/bf-gen-server/dist/
COPY ./packages/bf-gen-client/dist/ ./packages/bf-gen-client/dist/
# set user to node user.
USER node
EXPOSE 8080
# define command to run the app.
WORKDIR packages/bf-gen-server
CMD ["npm", "start"]
