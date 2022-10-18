1 - npm install
2 - export $(cat .env | sed 's/#.*//g' | xargs)
3 - nodemon index.js