FROM node:18-alpine
ENV NODE_ENV=production
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package-lock.json package.json ./
RUN npm ci --only=production 
COPY --chown=node:node . .
ENV HOSTNAME "0.0.0.0"
RUN npx prisma generate
RUN npm run build
RUN mkdir /public/show_images
RUN mkdir /data