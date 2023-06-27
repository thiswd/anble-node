# Ablefy

> Note: Create your own `.env` file with `DATABASE_URL` variable. You can use `.env.example` as a base for your own `.env` file.

> Note: This projects contains a seed file to seed your database. Remember to use `npm run seed` before. This script also runs before testing.

> Note: If you have trouble editing the source code in your local environment, you can use the docker setup mentioned below

### Description

The database has models for Artists, Albums, and Songs, you could check their relationship on their schemas. You are required to make some queries and retrieve the data from the database.

### Requirements

**Must have**

- The endpoint `/api/songs/` that gets all the songs should be paginated. It should have `page` and `size` params.

- The endpoint `/api/songs/top` should return the 10 most listened songs.

- The endpoint `api/artists/top` should return the 3 most popular artists with an agregated field `totalPlaybacks` in each one.

<hr />

## Notes

Remember to remove `.skip` from the tests found on `/backend-ablefy/tests/`

<hr />

## **Docker Setup**
This guide will help you to run the components of the exercise as Docker containers using Docker Compose on your local environment.

**Prerequisites**
  * Docker: [Linux](https://docs.docker.com/engine/install/ubuntu/), [MacOS](https://docs.docker.com/docker-for-mac/install/), [Windows](https://docs.docker.com/docker-for-windows/install/)
  * [Docker Compose](https://docs.docker.com/compose/install/) (Only for Linux)
**Run your environment**

### **Ablefly**
The following command will run the application along a PostgreSQL database:
```
docker-compose up -d
```
You can check the status of the Docker containers by running:
```
docker ps
```
By default, the application will run on port 5000 ( https://localhost:5000)
