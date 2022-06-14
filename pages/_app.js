import '../styles/globals.css'


import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />
}

export default MyApp
