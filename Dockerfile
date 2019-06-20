FROM node:8-alpine as buildcontainer
WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm ci
COPY . /app
RUN node_modules/@angular/cli/bin/ng build --prod --deploy-url "dist/"

FROM node:8-alpine

WORKDIR /app
RUN npm i cors express
COPY --from=buildcontainer /app/local.js /app

# Get all the code needed to run the app
COPY --from=buildcontainer /app/dist /app/dist
# Too lazy to configure webpack :)
COPY --from=buildcontainer /app/dist/wtp-ui/index.html /app/dist/

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["node", "server.js"]
