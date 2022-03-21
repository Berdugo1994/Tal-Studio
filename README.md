# Tal-Studio

## Visit https://talfekler.com


## Start the app Local via installing(without using docker)
•	clone the repo  
•	create a .env file in the root directory (look at the bottom of this readme)  
•	open cmd/terminal and cd to the root directory  
•	run: `npm run install_both` - it might take few minutes for the first time  
•	run: `npm run start`  
•	in your browser hit `localhost:<NODE_DOCKER_PORT>` (the value from .env file. i.e `localhost:8080`)  
That's All!  


## DEV:(using docker)
•	cd C:\...\TalStudio  
•	cmd: npm run install_both  
•	create a .env file in the root directory (look at the bottom of this readme), make sure NODE_ENV="dev" 
•	Make sure docker daemon is running(software is running)  
•	docker-compose up 
•	in your browser hit `localhost:<NODE_DOCKER_PORT>` (the value from .env file. i.e `localhost:8080`)  
That's All!

## PRODUCTION on AWS: prepare, deploy, clone and run.
### Prepare:
•	cd C:\...\TalStudio  
•	cmd: npm run install_both  
•	docker-compose build
•<b>	test locally</b>  
docker-compose up  
google chrome -> localhost:8080  
### Deploy:
•	if you’re not logged in then:  
o	cmd: docker login
o	username: ---------  
o	password: ---------  
•	docker tag tal_studio berdugogo/tal_studio:aws  
•	docker push berdugogo/tal_studio:aws  
### Clone:  
####	at MobaXterm (or any other ssh connect to host)  
•	MobaXterm: login to my ec2 using ssh. Insert private key in software.  
•	Bash: docker login(same as in previous steps)  
•	create a .env file in the root directory (look at the bottom of this readme)  
•	clone the docker-compose.yaml file from this repo to the root directory.  
•	Bash: docker-compose pull  
### RUN:
•	docker-compose up  
That's All!  



## .env file structure(*values are EXAMPLE!*):
``` NODE_ENV=dev  
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.z9epz.mongodb.net/<db_name>?retryWrites=true&w=majority  
SALT=<salt number you desire>
COOKIE_SECRET=<Your Cookie Secret String>
USING_INTERNET=true
EMAIL_PASSWORD=<Your Email Password, you should also change email address to yours.>
NODE_DOCKER_PORT=8080
NODE_LOCAL_PORT=<Number the port you would to be as your app `gateaway`. from this port you'll run localhost:PORT for example.>
