# shared-lyrics 🎧

> Lyrics of songs created by different users.

This project was developed in inspiration of the graphql course given by Stephen Grider 
[here](https://www.udemy.com/course/graphql-with-react-course/). But as always 😅 I like to 
tweak stuff a little bit, so in addition, I've changed the server to be fully on `ApolloServer`, and
to use a mock data repository instead of a real database, in this case with `json-server` which also gives
a REST API  along with, and for styling on the FE, used `chakra-ui`.

## How to run it? 🤔

The project is composed by two folders

- app
- server

Both project uses `yarn`, so in order to run the next steps, make sure you have `node` and `yarn` properly running.

⚠️ Minimal node version: *14.17.0* ⚠️

### app

Enter the app folder

```shell
cd app/
```

Install dependencies

```shell
yarn
```

Create a .env.local file, the example will have the variables that are being used in the project, if something goes wrong, double check the values in this file that might give you some clue 💪

```shell
cp .env.local.example .env.local
```

Start the server

```shell
yarn start
```

...now, let's go to the server part 🏃‍♀️

### server

Enter the server folder

```shell
cd server/
```

Install dependencies

```shell
yarn
```

Create a .env file. Same rules described above for the app applies here as well.

```shell
cp .env.example .env
```

Start the server

```shell
yarn start:dev
```

## Contributing

Contributions are what make the open source community such an amazing place to
be learn, inspire, and create. Any contributions you make are **greatly
appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/something-amazing`)
3. Commit your Changes (`git commit -m 'feat: Add something amazing'`)
4. Push to the Branch (`git push origin feature/something-amazing`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Samuel Silva - [@samuelsilvadev](https://twitter.com/samuelsilvadev)