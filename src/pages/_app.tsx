import '../app/globals.css'

interface props {
    Component : any,
    pageProps: object  //any type of data that will be passed to the component as a

  }

export default function App({ Component, pageProps }:props) {
  return (<Component {...pageProps} />)
}