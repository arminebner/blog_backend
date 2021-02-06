FROM arm64v8/node:14.15.4-alpine3.12

WORKDIR /home/blog_backend/

COPY package.json /home/blog_backend/

RUN npm install

COPY . /home/blog_backend/ 

EXPOSE 5000

CMD ["node", "/home/blog_backend/server.js"]