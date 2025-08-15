import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from '../components/Navbar'
export default function RootLayout({ children }) {
  

  return (
    <>
      <Head>
        <title>汪喵通SIM｜台北 eSIM專家｜eSIM、實體sim卡｜International 各國旅遊eSIM </title>
        <meta name="description" content="Speed-eSIM | International eSIM" />
        <meta name="keywords" content="產品, 購物, 優惠" />
        <meta name="author" content="" />
        <link rel="icon" href="/logo.ico" />
        <meta property="og:title" content="Speed-eSIM | International eSIM" />
        <meta property="og:description" content="Speed-eSIM | International eSIM" />
        <meta property="og:image" content="/default-og-image.jpg" />
        <meta property="og:url" content="https://www.starislandbaby.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Speed-eSIM | International eSIM" />
        <meta name="twitter:description" content="Speed-eSIM | International eSIM" />
        <meta name="twitter:image" content="/default-og-image.jpg" />
      </Head>

        
      <div className=" w-full overflow-hidden ">
         

<Navbar/>
  
      {children}


      
      </div>
    </>
  );
}
