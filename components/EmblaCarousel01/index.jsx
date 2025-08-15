import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import Header from "./Header";
import Footer from "./Footer";

const OPTIONS = { dragFree: true, loop: true };

// Define an array of slide objects with iframe content
const SLIDES = [
  {
    image: "/images/39028a5186a71322c51a772cf6dd56907a72f26e.webp", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
  {
    image: "/images/69956bdc1fe156ff2a9c1f2dc008b839dd1055f7.webp", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
  {
    image: "/images/ac564398d6bb2a2fcbb41e30c402a0b8e8a1c0f4.webp", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
  {
    image: "/images/7471ced3b63e514a6b4d32aa955efdd09832906e.webp", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
];

const App = () => (
  <>
    {/* Uncomment the lines below if you have header and footer components */}
    {/* <Header /> */}
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    {/* <Footer /> */}
  </>
);

export default App;
