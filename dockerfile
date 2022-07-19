FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY /compile ./

RUN npm install
RUN npm install bcrypt
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8000
CMD ["npm", "start"]