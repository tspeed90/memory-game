## MEMORY GAME
This is a basic click-and-match memory game using images from the Pixabay API. The project can be found on Heroku here: https://memflip.herokuapp.com

This project was made for the purposes of learning more about and practicing the following concepts:
- Node
- Request Module
- XHR Requests
- Supertest/Nock testing
- Environmental Variables


### To run the project locally:
```
$ git clone https://github.com/tspeed90/memory-game.git
$ npm install
```

#### Getting an API key
Apply for an API key from [Pixabay](https://pixabay.com/api/docs/). In the root directory, create a file called '.env' and type API_KEY= followed by your api key. See example below.
```
API_KEY=1234567890
```

#### Starting the server
```
$ npm start
```