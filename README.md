# User API

The User API is an Node JS API responsible for CRUD operations on a MongoDB instance.

## Getting Started

This API is just a part of a micro service architecture 

### Prerequisites

This project only requires Node JS:

* **[node](https://nodejs.org/en/)**



### Installing and Running

Node JS comes with a package manager named npm that take care of the project dependencies.

Run npm to install the dependencies (the following command has to be executed just once):

```
npm install
```
Now, you just need to run the server:

```
npm start
```



## Deployment

To deploy this project, you'll need the following programs:

* **[docker](https://docs.docker.com/engine/installation/)**
* **[docker-compose](https://docs.docker.com/compose/install/)** *(only for MAC and linux)*

The docker-compose will take care of everything: it will download the images e run the containers for you.

Run the commands below to get up the service:

```
docker-compose up
```

And you'll have the API running on **[http://locahost:3000/](http://localhost:3000/)**