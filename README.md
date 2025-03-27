PowerStation Project
This project aims to process a CSV file containing information about power plants, processing and storing the data in a PostgreSQL database. The back-end is developed using Kotlin with Spring Boot, while the front-end is built with TypeScript, React, Vite, and other modern tools to create dynamic and responsive interfaces.

Technologies Used
Back-End:

Kotlin

Spring Boot

PostgreSQL

Maven

REST API

Front-End:

TypeScript

React

Vite

npm

Directory Flow
The project is structured in a way that facilitates development for both the back-end and front-end. The workflow between the two is as follows:

Back-End (Kotlin with Spring Boot):
The back-end exposes a REST API to handle and save the power plant data (PowerStations).

It consumes a CSV file with power plant information and stores this data in the PostgreSQL database.

Communication between the front-end and back-end is done via the RESTful API.

Front-End (React with TypeScript and Vite):
The front-end provides an interactive interface where users can view the power plant data and perform other interactions.

It consumes the back-end APIs to dynamically and responsively display the power plants' data.

The flow between the two is well-defined, with the back-end providing the data that the front-end consumes to present to the user.

Project Structure
The project is organized as follows:

powerstation-project/
├── backend/            # Back-end code in Kotlin
│   ├── src/
│   ├── pom.xml         # Maven dependencies
│   └── application.properties  # Database connection settings
├── station-ui/         # Front-end code
│   ├── src/
│   ├── package.json    # npm dependencies
│   └── vite.config.ts  # Vite configuration
└── README.md           # This file
backend/: Contains all the code responsible for data manipulation and exposing the API.

station-ui/: Contains the front-end code responsible for the user interface.

How It Works
Back-End: The back-end reads a CSV file containing data about power plants and stores that information in a PostgreSQL database. The RESTful API allows the front-end to communicate with the back-end to retrieve or manipulate power plant data.

Front-End: The front-end is the interface that interacts with the API to display the power plant information in an interactive manner. It provides functionalities such as viewing and possibly manipulating this data using the APIs provided by the back-end.

