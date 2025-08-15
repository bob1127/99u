import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import Header from "./Header";
import Footer from "./Footer";

const OPTIONS = { dragFree: true, loop: true };

// Define an array of slide objects with iframe content
const SLIDES = [
  {
    image: "/images/japan.jpg", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
  {
    image: "/images/japan.jpg", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
  {
    image: "/images/japan.jpg", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
  {
    image: "/images/japan.jpg", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
  {
    image: "/images/japan.jpg", // Image for the first slide
    title: "我們贏的過二十一點莊家優勢嗎？",
    description:
      "二十一點（Blackjack）是最受歡迎的賭場遊戲之一，它以其結合技巧與運氣而聞名。與許多完全靠機率的賭場遊戲不同，二十一點允許玩家透過正確的策略來影響勝率。不過請記住：無論你玩得多好，賭場始終佔有優勢。",
  },
  {
    image: "/images/japan.jpg", // Image for the first slide
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
