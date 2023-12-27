# Movie Project Frontend

Welcome to the Movie Project Frontend! This project is a React application that allows users to log in and interact with movie data. It utilizes React-Bootstrap for design and Redux for API calls.

## Introduction

The Movie Project Frontend is a React application designed for managing movie data. It includes a login screen and various screens for displaying, creating, and editing movies. The movie entity comprises three fields: title (text), publishing year (number), and poster (image).

## Getting Started
- create-react-app movies-list

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 16 or higher)
- npm or yarn


## Project Structure

The project structure is organized as follows:
```bash
.
└── movies-list
    └── src
        ├── assets
        │   ├── images
        │   └── style
        ├── axios
        ├── components
        ├── constants
        ├── redux
        │   └── reducers
        ├── routes
        │   └── routes
        ├── services
        │   ├── authServices
        │   └── moviesServices 
        ├── utils
        ├── view
        │   ├── home
        │   ├── login
        │   ├── movies
        │   │   └── add-edit
        │   └── register
        └── ...
```

* `src/view/`: Contains React components for Login, MovieList, MovieForm, etc.
* `src/redux/`: Manages Redux-related actions and reducers.

**Dependencies**

* React
* bootstrap
* React-Bootstrap
* Redux-toolkit
* sass
* react-hook-form
* react-paginate

### Installation

To install the project dependencies, run the following command:

bash
npm install
# or
yarn install

Configuration
Create a .env file in the project root and add the necessary environment variables:
{backendurl}

Running the App
To start the react app, run:

bash

npm start

## Features
1.Login Screen: Allows users to log in to the application.
![image](https://github.com/sanj123456/Assignment/assets/37290949/0aaccafc-0b00-4671-9c45-676958a9b32a)

2.Register Screen: Allows users to create account in the application.
![image](https://github.com/sanj123456/Assignment/assets/37290949/48efe437-d876-42a7-bef7-7d72fa86d462)

2.Movie List: Displays a list of movies.
![image](https://github.com/sanj123456/Assignment/assets/37290949/e7f773ad-9b43-4b4e-a115-0ed76537c4dd)

3.Movie Form: Allows users to create and edit movies.
![image](https://github.com/sanj123456/Assignment/assets/37290949/5a4be9ed-eb8a-456f-b72b-94af8593fb25)
![image](https://github.com/sanj123456/Assignment/assets/37290949/40764e8a-8d6c-4247-8be3-5a080b4dc62c)


## Usage Examples

Redux Usage

1.Import useDispatch and useSelector in your component:
import { useDispatch, useSelector } from 'react-redux';

## Future Development
1.Comment Section: Add a comment section for each movie.
2.Search Filter: Implement a search filter for movies.
3.Category Filter : Implement a Category Filter for movies.

Deployment
The Front End React project is deploy on Netlify.

-
Netlify is a cloud platform that provides a range of services for modern web development, primarily focused on simplifying the deployment and hosting of web applications. 

Contributing
Contributions to this project are welcome. Please follow the standard fork-and-pull request workflow.

License
MIT License

Happy Coding
