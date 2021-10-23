import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import tmpLayout from '../components/tmpLayout'


const layouts = {
  L1: Layout,
  L2: tmpLayout,
};


import App from "next/app";
import { Provider } from "../context";

class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props;
    console.log("props ", Component.layout)
    const Layout = layouts[Component.layout] && layouts[Component.layout] || layouts['L1'] //(({children}) => <>{children}</>);
    return (
      <Provider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default MyApp;