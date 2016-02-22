FROM risingstack/alpine:3.3-v4.2.6-1.1.3
RUN apk add --update bash && rm -rf /var/cache/apk/*
COPY package.json package.json
RUN npm install

# Add your source files
COPY . .
EXPOSE 3000
CMD ["npm","start"]
