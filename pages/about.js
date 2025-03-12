import React from "react";
import { Typography, Container, Link } from "@material-ui/core";

const about = () => {
  return (
    <Container>
      <Link href="/">Home</Link>
      <Typography variant="h3">About</Typography>
      <Typography variant="body1">
        After reviewing the requirements, I read the documentation for GraphQL
        and Apollo Client to familiarize myself with the technologies. I then
        implemented the initial query (getTodos). The mutations took a bit
        longer to implement, mainly due to the time spent understanding the
        hooks and their functionality, as well as referencing the models within
        the mutation resolvers. The "About" route was relatively
        straightforward, requiring only a simple reference to the Next.js
        documentation on routing and pages.
      </Typography>
      <Typography variant="body1">
        The "Bonus" section was also clear to implement. For the search filter,
        I applied a utility function to filter the todos array. The edit
        functionality was simple, though I briefly considered creating a
        separate mutation just for updating the title. Ultimately I decided to
        use the same mutation (updateTodo) for consistency.
      </Typography>
    </Container>
  );
};

export default about;
