import '../styles/globals.css'

import cookieCutter from "cookie-cutter"

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    return () => {
      if (cookieCutter.get('cartid')) return;
      const newUuid = uuidv4();
  
      fetch("http://192.168.1.144:3002/carts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: newUuid
        })
      }).then((res) => {
        if (res.ok) {
          cookieCutter.set('cartid', newUuid) 
        }
      })
    }
  
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
