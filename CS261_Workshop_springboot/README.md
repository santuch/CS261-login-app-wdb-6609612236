1. Change the Your_Actual_API_key in script.js file to your own apiKey

2. Build the Docker Image
   Once you're inside the project directory, build the Docker image using the following command:
   docker build -f DockerContainer_NodeJS.dockerfile -t my-login-app .

3. Run the Docker Container
   After building the Docker image, run the container using this command:
   docker run -d --name node-server --network mynetwork -p 3000:3000 my-login-app

4. Stopping and Removing the Container
   To stop the container:
   docker stop node-server

    To remove the container after stopping it:
    docker rm node-server

5. Accessing the Application
   Once the container is running, open your browser and go to:
   http://localhost:3000
   You should see the login page for the Node.js application. From here, you can interact with the app as intended.
