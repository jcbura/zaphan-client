# zaphan

a next.js app for memorizing scripture with fill-in-the-blank tests

## features

- select a translation, book, chapter, and optional verse range
- read full chapter text or narrow to a single verse or range
- set a difficulty (0–100%) to control how many words are blanked
- take interactive memorization tests with submit, reset, and reveal controls
- persist verse selection across sessions (test progress is not saved)

## prereqs

- [node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [git](https://git-scm.com/)
- [bible-drizzle-api](https://github.com/jcbura/bible-api)

## installation & setup

### 1. clone the repo

```bash
git clone https://github.com/jcbura/bible-client.git

cd bible-client
```

### 2. install dependencies

```bash
npm install
```

### 3. environment configuration

```bash
cp .env.example .env
```

### 4. start the api

from the [api](https://github.com/jcbura/bible-api) directory, follow its setup steps and run:

```bash
npm run start:dev
```

### 5. start development server

```bash
npm run dev
```

the app runs at [http://localhost:3001](http://localhost:3001).

## scripts

| command          | description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | start dev server with turbopack on port 3001 |
| `npm run build`  | production build                             |
| `npm run start`  | serve production build                       |
| `npm run lint`   | run eslint with auto-fix                     |
| `npm run format` | run prettier                                 |

## tech stack

- [next.js](https://nextjs.org/) 16 (app router, turbopack)
- [react](https://react.dev/) 19
- [redux toolkit](https://redux-toolkit.js.org/) + [rtk query](https://redux-toolkit.js.org/rtk-query/overview) for state and api caching
- [redux-persist](https://github.com/rt2zz/redux-persist) for verse selection persistence
- [tailwind css](https://tailwindcss.com/) 4

## project structure

```
src/
├── api/              rtk query endpoints (books, chapters, translations, verses)
├── app/              next.js app router pages and layout
├── components/       ui, verse selection, and memorization components
├── hooks/            rtk hooks and use-memorization-session orchestration
├── memorization/     blanking, scoring, scope resolution, and test building
├── providers/        redux store and theme providers
├── stores/           redux slices (verse selection, memorization)
├── styles/           global css
└── utils/            shared utilities
```

## how it works

1. **verse selection** - pick translation, book, chapter, and optionally a start/end verse. the resolved scope determines what text is fetched from the api.
2. **display** - once a chapter (or narrower scope) is selected, verse text is shown read-only.
3. **difficulty** - set a percentage (0–100) to define how many words will be blanked in a test.
4. **test** - start a test to replace words with inputs. submit to grade answers, reset to re-blank at the same difficulty, or reveal individual or all blanks.
5. **stale state** - changing translation, book, chapter, or verse range clears any in-progress test.

## api dependency

this app consumes the bible-drizzle-api. relevant endpoints:

```
GET /translations
GET /books
GET /books/:bookId/chapters
GET /books/:bookId/chapters/:chapterNumber/verses?start=&end=
```

full api documentation is available at [swagger ui](http://localhost:3000/api) when the api dev server is running.
