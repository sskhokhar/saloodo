import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Seller Portal</title>
      </Head>
      <main className="app">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
        ,
      </main>
    </>
  );
}

export default CustomApp;
