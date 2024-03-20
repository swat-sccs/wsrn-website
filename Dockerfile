FROM node:18-alpine
ENV NODE_ENV=production
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package-lock.json package.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --chown=node:node . .
ENV HOSTNAME "0.0.0.0"
RUN npm run build