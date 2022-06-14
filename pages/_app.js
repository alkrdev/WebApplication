import '../styles/globals.css'

import Cookies from 'cookies'

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />
}

MyApp.getInitialProps = ({req, res}) => {
  const cookies = new Cookies(req, res)

  var id = cookies.get('cartid')
  
  if (id) return;
  const newUuid = uuidv4();

  console.log("BEFORE FETCHING")
  fetch(process.env.NEXT_PUBLIC_WEB_SERVER + "/carts/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: newUuid
    })
  }).then((res) => {
    console.log("COOKIE SET ATTEMPT")
    if (res.ok) {
      cookies.set('cartid', newUuid, {
        httpOnly: false
      }) 
    }
  })
}

export default MyApp
