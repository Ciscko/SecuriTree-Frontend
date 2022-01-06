# SecuriTree-Frontend
The react js frontend for SecuriTree App.
This front end application is the presentational layer for the SecuriTree application system.
It authenticates and fetches the data from the backend API, displays the Securitree Areas in a hierarchy, allows locking and unlocking of doors and automatic uploading of data.

This frontend makes it easy for a user to manage the SecuriTree entities: doors and areas. A user can update the hierarchy and the entity details by uploading a new JSON file into the system data field. They can easily search for a door, see it's status and update the status as either closed or open.

The high-level overview of the whole application is as shown below:

![ARCHITECTURE](https://user-images.githubusercontent.com/32708966/148316842-5f39fb6d-25c8-451a-aef7-7bb07abfe76e.png)


STEPS ON HOW TO INSTALL ON YOUR PC?
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



