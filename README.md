## Cash Flow Forecaster

This project was developed to FoFs managers to monitor their portfolios. It was build with react, bootstrap and sass. 

##  Future implementations

- deal with data more cleverly on the projections component;
- debug toast to appear when API returns success/error when PUT and POST requests are made;
- implement filters on the existing commitments page - opening a modal when clicking the "filters" button;
- correction to input value in scenarios strategy and fund (when typing negative numbers appears NaN);
- make all tooltips equal;
- adjust graphic responsiveness;
- adjust data sent to API for when only some values are updated in IRR Fund;
- correction to responsiveness - make content centralized on the screen;
- ordinate the graphic by year for NAV data in projections (ascending);
- add animation to select a portfolio page (I had a conflict during the building process and have to remove it)
- implement unit tests in all components - using jest;
- implement end to end tests - cypress;
- remove unused variables from sass;

## Available Scripts

In the project directory, you can run:


### `npm install`
Install all the packages in package.json for this api.


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
