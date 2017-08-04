# Climate Watch

Add some nice description of the project.

## Local setup

### Installing dependencies

```
yarn run js:install
```

and then

```
yarn run rails:install
```

These will satisfy both the frontend and backend's dependency requirements.

#### Setting up the Rails environment

Copy the sample `.env.sample` file to `.env` and modify it as needed to fit the
project's settings. At the very least you'll need to have the `DATABASE_URL`
env variable.

```
DATABASE_URL=postgresql://postgres@localhost/climate-watch_development
```

#### Setting up the database

```
yarn run rails:db:create
```

and then

```
yarn run rails:db:migrate
```

These will create the development database and then run the database migration tasks.

### Launching The App

You'll need to run both the rails server and the webpack server, which will be used internally by rails. Run, separately:

```
yarn run rails:server
```

and

```
yarn run js:server
```

Point your browser to `http://localhost:3000/`. Ta-da!


## Frontend Architectural choices

The fronted uses react, redux and react-router.  
There are some peculiarities in the architectural choices that we will outline in this section.

## Router
The router version used in the project is `v.4.1.1`.

- routes are defined as a data-structure instead of using `jsx` inside the `routes.js` file.
- Instead of connecting the routes to the reducer via middleware we decided to use `withRouter` HOC instead, which means whenever you need access to the router information you will have to wrap your component with `withRouter`.

## Modules

Perhaps the bigger peculiarity is the module based architecture. What a module architecture means is that all the elements that are part of a component are contained inside the same directory.  
That includes not only Component and Container, but also styles, reducers and actions.

### Typical module structure:

```
├── my-module/
│   ├── components/
│   ├── my-module-actions.js
│   ├── my-module-component.jsx
│   ├── my-module-reducers.js
│   ├── my-module-styles.scss
│   └── my-module.js
```

### Module entry point

The module entry point, named as the directory containing the module acts exports every element of the module individually and acts as container (as in [container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)) if needed.

### Module Component

The module's Component (as in [presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)) only contains the view in `jsx`.
Every state related or action concern will be taken care of in the container in such way that the component will receive it via `props`.
The Component never handles logic.

### Module styles

For all the application styles we are using [css-modules](https://github.com/css-modules/css-modules), this allows for local scope (BEM for free) and theming/styles combination.

If the module we are writing is supposed to be reusable, the styles contained within the module only refer to the particular functioning of that module.
No aesthetic definition belongs in the module styles.

Whenever the module will need to be mounted in the application and given some style, the module will provide the means to be customized using [react-css-themr](https://github.com/javivelasco/react-css-themr)
and the parent will be responsible for styling the component with the app specific styles.

If the module we are writing is only meant to live in the current app it's ok to have app specific styles in there, always using global styles as layout or grid used across the app (these will be combined into the local styles).
