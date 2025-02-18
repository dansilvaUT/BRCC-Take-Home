import React from 'react';
import App from 'next/app';
import {ApolloProvider} from '@apollo/react-hooks';

import withApollo from '../lib/with-apollo';
import Layout from '../components/Layout';

// eslint-disable-next-line require-jsdoc
class MyApp extends App {
  /**
   * Render component
   * @return {*}
   */
  render() {
    const {Component, pageProps, apollo} = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
