[![Stories in Ready](https://badge.waffle.io/Krustal/builder.png?label=ready&title=Ready)](https://waffle.io/Krustal/builder)
# Character Builder

Character builder

# Basic Structure

`public/`

Static files, including the landing page `index.html`

`src/`

All javascript files. These are bundled through Webpack and output into `public/assets/main.bundle.js`.

# Getting Started

**Clone the Repo**

```
git clone https://github.com/Krustal/js-starter.git
npm install
```

**Quick Start**

```
npm start
```

Starts a browser-sync session on localhost:3000 with browser-sync ui on
localhost:3001.

# Development

**Running tests**

```
npm test
```

Runs the karma test environment.

```
npm test -- --no-single-run
```

Runs tests and then re-runs on change

**Run style-guide**

This project uses `react-storybook` to run a live updating styleguide for all
presentational components.

```
npm run styleguide
```

The styleguide "stories" live in `[repo root]/styleguide/stories` and take the
same directory structure as the components library in `src`.

**Building manually**

```
npm run webpack
```

Runs a manual build of the project in development mode.

```
npm run build
```

Runs a manual build of the project in PRODUCTION mode. This build takes longer
and performs some extra steps to compress output and remove test helpers. It
also extracts CSS into a separate css module and injects the link to it in the
header.

```
npm run prod-server
```

Alias to the `npm run build` script followed by starting a browser-sync session.
Running this way does not have any watchers in place, but if you need to verify
the production build this is the place to do it.
