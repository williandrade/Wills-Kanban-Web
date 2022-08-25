# Will's Kanban

A simple Kanban app without BE integration.

## Setup Guid

For run the project you will need to have:
- [NodeJS](https://nodejs.org/en/download/)

Once it is installed you should be able to install the project's dependencies by running `npm install` in your terminal or command propt.

## Data Setup

There is some data present in the application in order to run the tests, it is also being loaded at the start of the application to show some sample at first.

### Modifying the data

You can find the data files into `src/data`

```
src/
├── assets
├── components
├── data/
│   ├── Cards.json
│   ├── Status.json
│   └── Tags.json
├── index.scss
├── index.tsx
├── services
├── stores
├── styles
└── util/
    ├── Constants.tsx
    └── Helper.tsx
```

### Loading the data on the start of the application

The file responsible to init the application state is `src/stores/Root.tsx`, you can find in there and replace the init of it.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.s

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.