FROM node:alpine

ENV NODE_ENV=production
ENV PORT=3000
ENV DEFAULT_LANGUAGE=en-US
ENV MEILI_HOST=http://127.0.0.1:7700
ENV MEILI_API_KEY=change_me

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build
EXPOSE $PORT

CMD ["npm", "start"]