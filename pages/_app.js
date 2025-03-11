import React from "react";
import { Apollo } from "../lib/apolloClient";
import Layout from "../components/Layout";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Apollo initialState={pageProps.initialApolloState}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Apollo>
  );
};

export default MyApp;
