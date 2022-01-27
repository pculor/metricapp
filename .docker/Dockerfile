# Use node 16
FROM node:16 AS client-build
WORKDIR /app


# Copy source code
# COPY . .
RUN cd client && npm install && npm run build



FROM node:16 AS server-build
# Change working directory
WORKDIR /app

# install dependencies
# copy package.json and install dependencies
COPY package.json package.json

# Copy source code
COPY . .

RUN npm install && mv node_modules /node_modules
RUN ls


# Expose API port to the outside for container
EXPOSE 4000

LABEL maintainer="Pascal Ulor <pascalulor@yahoo.com>"

# Launch application
RUN ["chmod", "+x", "/app/dev.docker-entrypoint.sh"]

ENTRYPOINT [ "./dev.docker-entrypoint.sh" ]
