# MEMORY GAME

Basic click-and-match memory game application using dynamic images from the Pixabay API.

[View the live site](https://memflip.herokuapp.com)

## To run the project locally:

```
$ git clone https://github.com/tspeed90/memory-game.git
$ cd memory-game
$ npm install
```

#### Getting an API key

Apply for an API key from [Pixabay](https://pixabay.com/api/docs/). In the root directory, create a file called '.env' and type API_KEY= followed by your api key. Example:

```
API_KEY=1234567890
```

#### Available Scripts

```
$ npm start        # fires up server
$ npm run dev      # runs gulp with watchify and server simultaneously
$ npm test
$ heroku-postbuild # runs gulp (no watchify) for heroku
```

Once you've started the server, you may now click the link in the terminal, or navigate to localhost:8080
