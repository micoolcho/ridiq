# RidiQ public page Front End

## External libraries

### CSS
- Bootstrap SASS: imported in `/src/sass/custimized_bootstrap.scss`, includes modules:
  - Core
  - Reset
  - Utils
  - Responsive Utils

## Project structure

### Source

Contain jsx (use ES6 & build js) and sass (build css)

src/
  jsx/
  sass/

### Build

#### `build/`

Includes pages:
- `index.html` : user public profile.
- `single-answer.html` : public single answer (with a list of comment).
- `single-question.html` : public single question (with a list of answers).
- `iframe.html` : embed iframe.
- `embed.html` : demo for embed iframe.

#### `build/css/`

Includes:
- `customized_bootstrap.css` : was built from `src/sass/customized_bootstrap.scss` with `grunt sass:bootstrap` command.
- `main.css` : styles for pages, was built from `src/sass/main.scss` with `grunt sass:main` command.

#### `build/js`

- `app.js` : was built from `src/jsx/app.jsx`.

## How to run

## Install dependencies

- Install npm packages
```
npm install
```

- Install bower packages
```
bower install
```

## Develop

- Run `npm start`. It will excute:
  - `browserSync` : live update on browser for any change of CSS/JS
  - `webpack` watch : auto make `/build/js/app.js` when we make any change in `/src/jsx`
  - `grunt:watch:sass` : auto make `/build/css/`
- Go to `http://localhost:3000`
- We use `browserSync` to auto update webpage in browser when `buid/` files was changed.

## Build production

Including build js, sass.

```
npm run build
```