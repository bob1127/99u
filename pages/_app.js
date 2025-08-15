import '../src/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { appWithTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// ✅ 延遲載入 Lottie 元件（只在 client 執行）
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// ✅ Lottie 動畫 JSON
import diceAnimation from '../public/lottie/Dice Roll Purple.json';

function MyApp({ Component, pageProps }) {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [isClient, setIsClient] = useState(false); // ✅ 避免 SSR

  useEffect(() => {
    setIsClient(true); // ⚠️ 確保 client-side 才執行下列邏輯

    const hasClosed = localStorage.getItem('announcement_closed');
    if (!hasClosed) {
      setShowAnnouncement(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('announcement_closed', 'true');
    setShowAnnouncement(false);
  };

  return (
    <>
      <Navbar />

      {/* ✅ 只在瀏覽器端才渲染公告 */}
      {isClient && showAnnouncement && (
        <div className="fixed bottom-4 right-8 z-[999999999999] max-w-sm w-full rounded-xl shadow-xl overflow-hidden border border-gray-300 bg-white">
          {/* 紫色科技感色塊 */}
          <div className="relative">
            <div className="h-6 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600" />
            <button
              className="absolute top-0 right-0 text-white text-lg px-2 hover:text-gray-200"
              onClick={handleClose}
              aria-label="關閉公告"
            >
              ×
            </button>
          </div>

          {/* 內容區塊 */}
          <div className="p-8 space-y-4">
           
            <div className="text-sm text-gray-800">
              <strong className="block mb-1 text-xl text-purple-700">全新娛樂體驗！</strong>
              加入全台最火線上娛樂城，捕魚機、老虎機、真人百家樂天天送獎金！
            </div>

           <div className="mt-2">
              <Lottie animationData={diceAnimation} loop style={{ height: 100 }} />
            </div>
            {/* ✅ Lottie 動畫只在 client 端載入 */}
           
               <Link href="https://www.99ubit.com/#/?superid=eric60" rel="nofollow noopener" target='_blank' className="block">
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-sm font-semibold py-2 rounded-md transition duration-200">
                立即註冊遊玩
              </button>
            </Link>

          </div>
        </div>
      )}

      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
