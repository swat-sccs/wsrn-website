FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules
RUN npm install --production --silent
RUN npm install -g serve
RUN chown -R node /usr/src/app
USER node
ENV HOSTNAME "0.0.0.0"
RUN npm run build
