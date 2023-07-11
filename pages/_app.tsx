import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { restoreToken } from "../redux/auth/authOperations";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import i18next from "../utils/i18n";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    restoreToken();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <I18nextProvider i18n={i18next}>
          <Toaster />
          <Component {...pageProps} />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
