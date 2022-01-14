# SecuriTree-Frontend
The react js frontend for SecuriTree App.
This front end application is the presentational layer for the SecuriTree application system.
It authenticates and fetches the data from the backend API, displays the Securitree Areas in a hierarchy, allows locking and unlocking of doors and automatic uploading of data.

This frontend makes it easy for a user to manage the SecuriTree entities: doors and areas. A user can update the hierarchy and the entity details by uploading a new JSON file into the system data field. They can easily search for a door, see it's status and update the status as either closed or open.

The frontend application is build by the following UI javascript-reactjs components: 

 1. Nav.js - This renders the navigation bar and the title for every page. It also has a lifecycle function that is used to check if a user is authenticated through reaching the  API with the available token; if authenticated, it proceeds to render the header and consequently allows rendering of a page. If a user is not authenticated, it redirects the    user to the login page.
 2. Login.js - This renders the login form. Upon clicking the submit, this component authenticates the user by reaching the API with the credentials. If user is successfully logged in, the Login.js has a callback function that stores the access tokens in the localStorage of the browser. This token is used in other requests to the API.
 3. Dashboard.js - This renders the links to the other pages. It is the home page component.
 4. DataUpload.js - This component renders the forms used to upload the data: system data and users data to the backend api storage.
 5. Hierarchy.js - This renders and presents the Securitree entities as a Hierarchy.
 6. Manage.js - This component renders a list of Doors in a table. It renders an input field for searching for Door using the name or id. It provides a button for each door to allow update the status of the door as either closed or open.
 
 8. BuildHierarchy.js - This component uses a Recursion formula to render the hierarchy data as a tree structure. The base base is to render an area details without children areas. Then it iterates through the children areas and renders each by passing the object to itself(recursion). This will build a tree for any object regardless of the depth.
 
![Recusive render](https://user-images.githubusercontent.com/32708966/149041578-28920c8e-d7bb-4d80-94f3-04dd2ef325f8.png).

Reactjs is a modern javascript library that enables a user interface to have seamless interactivity. Navigation from one page to another does not need a reload of the whole html page but only some parts of the virtual document object model are rendered while others are replaced.

Therefore this application is a Single-page Application since the whole ui functionality is performed on the same UI. 
Once the application is build, the javascript bundle is loaded into the html file and the whole functionality is that javascript bundle.

AUTHENTICATION

Authentication uses the Bearer token. Upon sending the user credentials, the frontend receives the access token. It stores the token in localStorage. Every time the frontend is querying the API, it will fetch the token from the browser and append the token in the headers of the request. When the backend the receives a request with valid access token, it will succesfully serve the client with the requested service.

![lOGIN](https://user-images.githubusercontent.com/32708966/149499826-13041562-3b6e-4f3d-b6fb-e5f6fdfab6ee.png)


TESTING

The unit tests for this UI components was done using javascript test runner JEST and using React Testing Library which allows to make the assertions for testing functions.
The tests files are found inside the src/__tests__ folder.

APPLICATION OVERVIEW

The high-level overview of the whole application is as shown below:

![ARCHITECTURE](https://user-images.githubusercontent.com/32708966/148316842-5f39fb6d-25c8-451a-aef7-7bb07abfe76e.png)


STEPS ON HOW TO INSTALL ON YOUR PC?

METHOD ONE:

Ensure you have docker installed on your PC, since the application is containerized.
Open the CMD and run the following:

 1. o docker run --name sec-front -p 3000:80 -d francoudev/securitree-repo:securitree-frontend
 2. o docker run --name sec-back -e SUPERUSER_USERNAME=yourusername -e SUPERUSER_PASSWORD=yourpassword -p 8000:8000 -d francoudev/securitree-repo:securitree-backend

This pulls the application images from docker hub and runs the applications. The superuser credentials to login to the application can be obtained from the owner of the docker repository. Open the browser and navigate to http://localhost:3000. Alternatively to set your own superuser credentials, you can clone this repo, set your own credentials in the .env environment variables and rebuild the image then run. How to do this? See method 2 below.

METHOD TWO

1. This is a containerized app using Docker, as a pre-requisite you must install Docker on your PC. 
Checkout this link on how to install Docker: https://docs.docker.com/desktop/windows/install/ 

2. Create a .env file and update the REACT_APP_API_URL and REACT_APP_APP_URL using the .env-example file as the template. Since you are running in localhost you can use:
 REACT_APP_API_URL=http://localhost:8000/api/ and REACT_APP_APP_URL=http://localhost:4000/. Note that REACT_APP_API_URL is a url for the Backend API.
 
4. Open the command promp inside the same folder where the Dockerfile is located and run the following:
5. docker build -t securitree-image .
6. then run docker run --name securitree-cont -d -p 4000:80 

That is it for running the frontend, open your browser and navigate to http://localhost:4000/, the app is rendered but you cannot login if the Backend API is not set up yet. Let's go to the backend repo to install the backend API. 

7. If the Backend app is installed, open the browser and login to the app using the superuser credentials.
8. Navigate to the Upload data page and on the USERS DATA Tab, upload the users_data.json file then on the SYSTEM DATA Tab upload system_data.json.
9. Cheers! You are set up, now you can navigate the Manage Doors page or the View Hierarchy page.




