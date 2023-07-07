import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { restoreToken } from "../redux/auth/authOperations";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    restoreToken();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <Toaster />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
