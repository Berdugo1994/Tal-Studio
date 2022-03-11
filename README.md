# Tal-Studio

## Talfekler.com
### DEV:
•	cd C:\...\TalStudio  
•	cmd: npm run install_both  
•	Make sure docker daemon is running(software is running)  
•	docker build . -t tal_studio:localhost  
•	docker run -e NODE_ENV="dev" -p 8080:8080 tal_studio:localhost  
•	localhost:8080 

### PRODUCTION: AWS
•	cd C:\...\TalStudio  
•	cmd: npm run install_both  
•	docker build . -t tal_studio:prod  
•<b>	test locally</b>  
docker run -p 8085:8080 tal_studio:prod   
google chrome -> localhost:8085  
•	if you’re not logged in then:  
o	cmd: docker login
o	username: ---------  
o	password: ---------  
•	docker tag tal_studio:prod berdugogo/tal_studio:aws  
•	docker push berdugogo/tal_studio:aws  
##	at MobaXterm (or any other ssh connect to host)  
•	MobaXterm: login to my ec2 using ssh. Insert private key in software.  
•	Bash: docker login(same as in previous steps)  
•	Bash: docker pull berdugogo/tal_studio:aws  
•	docker run -p  80:8080 berdugogo/tal_studio:aws  
