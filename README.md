# Web Interview Project

Using any tools provided let's build a TODO web appliaction. The app only needs to do a couple things. Primarily it is going to interact with the local sqlite3 database. We will create a CRUD app for TODOs. You can find an example of what the basic app should be able to accomplish in the `static/example` directory.

## Acceptance Criteria
* [ ] The user should be able to create a new todo item by entering a description and pressing a "+" button.
* [ ] The user should be able to mark a todo item as complete by clicking a checkbox next to the item.
* [ ] The user should be able to delete a todo item by clicking a "Delete" button next to the item.
* [ ] The user should be able to see a count of the total number of todo items and the number of incomplete items.

## Bonus Points
* [ ] The user should be able to filter the list of todo items by typing in a search box and seeing only the items that match the search criteria.
* [ ] The user should be able to reorder the list of todo items by dragging and dropping them into a new order.
* [ ] The user should be able to edit the todo item inline by clicking on the description and editing it in place.
* [ ] Create a mobile friendly hero component that pulls a dynamic image based on breakpoints.

## Getting Started
1. Clone the repo
2. Install Node packages
    ```shell script
    yarn set version berry
    yarn
    ```
3. Create an `.env` from the `.env.example`.
4. Run database migration:
    * Run migration
    ```shell script
    npx sequelize-cli db:migrate
    ```
5. Start application in development
    ```shell script
    yarn dev
    ```

### Built With
* [Next.js](https://nextjs.org)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server)
* [Apollo Client](https://www.apollographql.com/docs/react)
* [Express](https://expressjs.com)
* [React](https://reactjs.org)
* [GraphQL](https://graphql.org)
* [Sequelize](https://sequelize.org)
* [SQLite](https://www.npmjs.com/package/sqlite3)
* [Material UI](https://material-ui.com)