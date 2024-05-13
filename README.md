
# UAMARVELAPI

##### The unconditional bond with Marvel is something that unites many of us, and what better way to show it than on Mother's Day? This Marvel API that I created for the UNAALMES challenge is a sample of the passion I have for this universe, and a small tribute to all the mothers who taught us to love these stories of heroes and villains!



## Screenshots

![App Screenshot](https://i.ibb.co/K2cv81P/imagen-2024-05-13-144449254.png)


## API Reference

#### Get API Menu

```http
  GET /api/v2
```

#### Get All Universes

```http
  GET /api/v2/universe
```

#### Get All Characters

```http
  GET /api/v2/character
```

#### Get All Comics

```http
  GET /api/v2/comic
```

#### Get All Creators

```http
  GET /api/v2/Creator
```

#### Get One Item

```http
  GET /api/v2/{category}/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`| `string` | **Required**. Category of item to fetch |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get One Item Thumbnail

```http
  GET /api/v2/{category}/image/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`| `string` | **Required**. Category of item to fetch |
| `id`      | `string` | **Required**. Id of item to fetch |

## Tech Stack

**Client:** JS Vanilla, Bootstrap

**Server:** Node, Express

**Database:** MariaDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### APPLICATION PORT

`PORT`

#### DB CONNECTION

`IP_DATABASE`

`DB_USER`

`DB_PASS`

`DB_DATABASE`

`MYSQL_ROOT_PASSWORD` (docker-compose.yml)

#### CONFIG JWT

`JWT_SECRET`

`JWT_EXPIRATION_TIME`

`JWT_COOKIE_EXPIRES`

#### NODEMAILER CONFIG

`NM_HOST_MAIL`

`NM_USER_MAIL`

`NM_PASSWORD_MAIL`

#### SECRET MAIL

`SECRET_MAIL`

#### FLAG

`UAM_FLAG`




## Run Locally

Change the IP_DATABASE variable to **localhost**

Go to the project directory

```bash
  cd app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Deployment

To deploy this project run with docker-compose

```bash
  docker-compose up -d --build
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

