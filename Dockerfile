#### SHARED DOCKER STAGES ##############

# The OS setup
FROM ubuntu as developer-os
MAINTAINER gemma <1801285@student.uwtsd.ac.uk>
ENV DEBIAN_FRONTEND    noninteractive
RUN apt-get update --fix-missing && \
apt-get install -y software-properties-common && \
apt-get install -y --no-install-recommends apt-utils && \
apt-get install -y curl \
wget
RUN echo "export SERVER_IP_ADDRESS='0.0.0.0'" >> /etc/profile
RUN apt-get clean

# Setup for node.js
FROM developer-os as nodeenv
MAINTAINER gemma <1801285@student.uwtsd.ac.uk>
# Create and change the working directory
WORKDIR /var/www/node
RUN curl -sL https://deb.nodesource.com/setup_13.x && \
apt-get install -y nodejs npm && \
npm install -g npm && \
npm install -g npx --force
RUN npm install -g package-json-merge && \
npm install -g nodemon
RUN apt-get clean
# Copy the typescript config file
COPY ./configs/tscompileoptions.json ./../configs/

#### THE WEB SERVER ##############

FROM nodeenv as webserver
# Expose our webservers port number
EXPOSE 80
# Change to the working directory
WORKDIR /var/www/node
# Execute the application
ENTRYPOINT ["npm", "run", "start"]

#### THE WEB SERVICE ##############

FROM nodeenv as webservice
# Expose our webservices port number
EXPOSE 1339
# Change to the working directory
WORKDIR /var/www/node
# Execute the application
ENTRYPOINT ["npm", "run", "start"]