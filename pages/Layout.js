import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from '../components/Navbar'
export default function RootLayout({ children }) {
  

  return (
    <>
<Head>
  <title>99u線上娛樂城｜百家樂｜體育投注｜電子遊戲｜真人娛樂</title>
  <meta
    name="description"
    content="99u線上娛樂城 - 提供百家樂、體育投注、電子遊戲、真人娛樂，安全快速的線上娛樂體驗。"
  />
  <meta
    name="keywords"
    content="99u, 線上娛樂城, 百家樂, 體育投注, 真人娛樂, 電子遊戲, 線上博弈"
  />
  <meta name="author" content="99u娛樂" />
  <link rel="icon" href="/logo.ico" />

  {/* Open Graph */}
  <meta property="og:title" content="99u線上娛樂城｜百家樂｜體育投注｜電子遊戲" />
  <meta
    property="og:description"
    content="99u線上娛樂城，匯集熱門百家樂、體育投注、電子遊戲與真人娛樂，立即暢玩。"
  />
  <meta property="og:image" content="https://www.99ubit.bet/images/solt-machine/card-img03.png" />
  <meta property="og:url" content="https://www.99ubit.bet" />
  <meta property="og:type" content="website" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="99u線上娛樂城｜百家樂｜體育投注｜電子遊戲" />
  <meta
    name="twitter:description"
    content="99u線上娛樂城 - 安全穩定、優惠豐富，最佳的線上娛樂選擇。"
  />
  <meta name="twitter:image" content="https://www.99ubit.bet/images/solt-machine/card-img03.png" />
</Head>


        
      <div className=" w-full overflow-hidden ">
         

<Navbar/>
  
      {children}


      
      </div>
    </>
  );
}
