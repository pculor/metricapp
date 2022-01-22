# METRIC APP

**METRIC APP** A metric posting and visualization application.
My thought process while working on this was to build and application like Kibana or grafana
in that the API can read any metrics specified with a value.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To get started with this project you need a basic knowledge of :

```
Typescript
ReactJS
NodeJs
Time-series database (InfluxDB)
Version Control (Git)
```

### Installation

The following instructions will install the project on your local machine

1. Install [**Node JS**](https://nodejs.org/en/).
2. Install [**InfluxDB**](https://docs.influxdata.com/) .
3. Clone the [**repository here**](https://github.com/pculor/metricapp.git)
4. [**cd**] into the root directory of the project folder `metricapp` and run `npm install`.
5. Run `npm install` on the terminal to install Dependencies and Dev-Dependencies

### How to run

1. setup environment variables using `.env.example` file.
2. Now open terminal to run your database migrations and run the application

```
npm install
```

```
npm run start:dev
```

If all goes well, you should see something similar to this on the console:

```
Application started on http://localhost:4000
```

## Integration tests

To test the endpoints, create a test database and run the following:

```
npm test
```

## Technology Stack

### Built With

- [Typescript](https://www.typescriptlang.org/) - Typescript
- [Node.js](https://nodejs.org/) - Javascript runtime
- [ReactJS](https://reactjs.org/)- Frontend
- [Express](https://expressjs.com/) - Web application framework
- [InfluxDB](https://docs.influxdata.com/) - Database
- [Jest](https://jestjs.io/) and Supertest - testing framework

## Features

The API and user interface is built for easy navigation and use of the application. It includes the following:

### API Architecture

`To Create a metric`
[POST] http://localhost:4000/api/v1/metrics

Request Payload
```
{
    "name": "finTech",
    "value": "20"
}
```

Response Format
```
{
    "success": true,
    "statusCode": 201,
    "message": "Metric Created Successful",
    "body": {
        "tags": {
            "name": "finTech"
        },
        "fields": {
            "value": "20"
        },
        "name": "metrics",
        "time": 1642824408412
    }
}
```

`To Retrieve` Metrics
[GET] http://localhost:4000/api/v1/metrics
```
```

## Deployment

This Application will be deployed on [HEROKU](#)

## Useful Links


## Authors

- **Ulor Pascal** - [PascalUlor](https://github.com/PascalUlor)
