import "../app/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";

interface props {
  Component: any;
  pageProps: object; //any type of data that will be passed to the component as a
}

export default function App({ Component, pageProps }: props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
