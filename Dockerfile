FROM node:18-alpine
ENV NODE_ENV=production
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
RUN mkdir -p /data/images && chown -R node:node /data/images
USER node
COPY --chown=node:node package-lock.json package.json ./
RUN npm ci --only=production 
COPY --chown=node:node . .
ENV HOSTNAME "0.0.0.0"
RUN npx prisma generate
RUN npm run build