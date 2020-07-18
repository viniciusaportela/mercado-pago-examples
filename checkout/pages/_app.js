import React from 'react'
import App from 'next/app'
import Head from 'next/head';

import '../global.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="https://fonts.googleapis.com/css?family=Barlow&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp