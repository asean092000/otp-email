# Enviroment

# Set up

cd root folder<br/>

# coppy file .env.example to .env

cp -b .env.example .env

# Start project

- To start our app, write the following command in your terminal<br/>
  docker-compose up dev<br/>
- This will start it in development mode<br/>
  docker-compose up prod<br/>
- This will start it in development mode<br/>

# Create user
docker exec -it app_dev sh <br/>
node dist/init/index.js <br/>

# docker ssh into node container

docker ps<br/>
docker exec -it app_dev sh ##for alpine<br/>

# Feature modules

- run npm install -g @nestjs/cli
- To create a module using the CLI, simply execute the <br/>
  $ nest g module cats command. <br/>
- To create a controller using the CLI, simply execute the <br/>
  $ nest g controller cats command.<br/>
- To create a service using the CLI, simply execute the <br/>
  $ nest g service cats command.<br/>

# Do a Clean Restart of a Docker Instance

- Stop the container(s) using the following command:<br/>
  docker-compose down<br/>
- To delete all the images:<br/>
  docker rmi -f $(docker images -aq)<br/>

- Delete all containers using the following command:<br/>
  docker rm -f $(docker ps -a -q)<br/>

- Delete all volumes using the following command:<br/>
  docker volume rm $(docker volume ls -q)<br/>

- Use this to delete everything:<br/>
  docker system prune -a --volumes

- Restart the containers using the following command:<br/>
  docker-compose up dev<br/>

# How do I discard unstaged changes in Git?<br/>

git stash save --keep-index --include-untracked<br/>

# Nestjs Error: Cannot find module './app.controller'<br/>

Run:<br/>
npm run prebuild<br/>
or<br/>
rimraf dist<br/>
or<br/>
rm -rf dist<br/>
