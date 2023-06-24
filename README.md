## Project Structure

There are 3 projects in ms-tracker
- library
- frontend
- functions

frontend is the web app that users interface with

functions deploys firebase cloud functions that can be called through HTTP
- While most data access is done through Firebase, the app laso needs to fetch data from api.maplestory.gg
- While this API is public, it is no longer being updated and does not have CORS properly configured. The Firebase Cloud Function will act as a proxy and cache for that API

library is a package that includes common code and configuration needed by the two deployments

## Build and Deployment

When first installing this repository, the library project should be installed first (`npm install` and `npm run build`). The library project should automatically be linked to the frontend and functions project

To start the frontend, run `npm install` and `npm run start`. To deploy, run `npm run deploy`

To emulate the cloud function locally, run `npm run import`, `npm install`, `npm run start`. Because our local library project cannot be installed on firebase cloud, we do this hack of copying the library package into the functions directory, so that the functions directory is shipped too. To deploy the cloud functions, run `npm run import` and `npm run deploy`