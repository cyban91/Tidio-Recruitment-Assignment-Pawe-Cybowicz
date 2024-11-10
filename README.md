# QA Engineer Recruitment test

## Before you start

The test is based on Playwright v1.48.1. You can find the full playwright documentation [here](https://playwright.dev/docs/intro). To build the project you will need [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install).
In the file `widget.test.ts` are the initial steps of the test.

Before starting, create an `.env` file in the main directory and put shared values into it. Without this, you will not be able to log in to the test project.

### Commands

In the project directory, you can run:

#### `yarn`

Installs a package and any packages that it depends on.

#### `yarn playwright install`

Installs playwright default browsers.

#### `yarn run test`

Launches test headless.

#### `yarn run dev`

Launches test non-headless with playwright inspector.

## Rules

- Please do not fork the repo, clone it and put it in your own github.
- When possible use selectors which resemble how users interacts with the page.
- Don't push the .env file to the repository.
- If you have any questions or need help please ask us.

## Part 1

Add the two missing steps to the test. In the first step click on the button "Simulate a Conversation" a popup will open with livechat preview. Dismiss the running chatbot, send the message and verify that it reached the user panel. In the second step, send a reply message from the user panel.

## Part 2 (Optional)

Use a docker to containerize project. Use the official Playwright Docker image or build a custom image. Include information how to run test from the docker side in the readme.

Good luck!


                                                                HOW TO RUN TESTS USING DOCKER

Before running tests with Docker, make sure the following are in place:

    1. If you do not already have Docker installed - do it from docker.com.
        - Windows and macOS: You can also install Docker Desktop, which provides a GUI and command-line interface.
        - Linux: Install Docker Engine via package managers or Docker’s installation script. 

    2. Make sure Dockerfile contains latest Playwright image (as of 10.11.2024 it is v1.48.2-focal)

If above is taken care of - proceed to building the image and running your tests.

    1. Build the Docker Image using this command in terminal (insert your image name instead of <name of the image>): docker build -t <name of the image> . 

    2. After the image has built, run your tests using this command in terminal: docker run --rm <name of the image> 
        - "--rm" removes the container after the run  

    3. If you want to automatically delete the image after running your tests, expand the command from point 2, to look like this: docker run --rm <name of the image> && docker rmi <name of the image> (if you are using bash terminal), or docker run --rm <name of the image> ; docker rmi <name of the image> (if you are using powershell terminal).

    4. If you are more of a UI person, you can remove containers and delete images via Docker Desktop. 




