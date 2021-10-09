import 'tailwindcss/tailwind.css'

// export function reportWebVitals(metric) {
//   console.log(metric)
//  }
 
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import App from "next/app";
import { Provider } from "../context";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default MyApp;