# How to set up MySQL database with docker

```sh
docker run --name EZ-DB -e MYSQL_ROOT_PASSWORD=${PASSWORD} -e MYSQL_DATABASE=${DB_NAME} -p ${PORT_TO_EXPOSE}:3306 -d mysql
```
