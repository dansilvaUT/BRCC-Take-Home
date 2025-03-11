import React from "react";
import { Typography, Container, Link } from "@material-ui/core";

const about = () => {
  return (
    <Container>
      <Link href="/">Home</Link>
      <Typography variant="h3">About</Typography>
      <Typography variant="body1">
        First thing I did after reading the requirements was to read the
        documentation on GraphQL and Apollo Client. Then implement the queries,
        mutations and resolvers. I did a small amount of reading on Next.js,
        specifically with routing. Lastly, I touched up some of the styling and
        added some smaller helpers and logic.
      </Typography>
    </Container>
  );
};

export default about;
