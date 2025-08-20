// pages/_app.js
import '../src/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { appWithTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// ✅ 只在瀏覽器載入 Lottie
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
// ✅ Lottie JSON
import diceAnimation from '../public/lottie/Dice Roll Purple.json';

// ===== 可調參數 =====
const STORAGE_KEY = 'announcement_closed_until';
const EXPIRE_DAYS = 7;          // 幾天後再顯示
const AUTO_CLOSE_MS = 0;        // >0 時自動關閉（毫秒）；0 = 不自動

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const modalRef = useRef(null);

  // 僅在 client 檢查是否應顯示
  useEffect(() => {
    setMounted(true);
    try {
      const until = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();
      if (!until || Number(until) < now) {
        setShowAnnouncement(true);
      }
    } catch {
      // Safari 無痕等情況，忽略
      setShowAnnouncement(true);
    }
  }, []);

  // 支援 ESC 關閉
  useEffect(() => {
    if (!showAnnouncement) return;
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showAnnouncement]);

  // 可選：自動關閉
  useEffect(() => {
    if (!showAnnouncement || !AUTO_CLOSE_MS) return;
    const t = setTimeout(() => handleClose(), AUTO_CLOSE_MS);
    return () => clearTimeout(t);
  }, [showAnnouncement]);

  const handleClose = () => {
    try {
      const until = Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(until));
    } catch {}
    setShowAnnouncement(false);
  };

  // 使用者偏好：減少動畫時停用 Lottie
  const prefersReducedMotion =
    mounted &&
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <Navbar />

      {/* ✅ 只在 client 且需要時顯示 */}
      {mounted && showAnnouncement && (
        <div
          className="fixed bottom-4 right-8 z-[999999999] max-w-sm w-full rounded-xl shadow-xl overflow-hidden border border-gray-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
          role="dialog"
          aria-modal="true"
          aria-labelledby="announce-title"
          aria-describedby="announce-desc"
          ref={modalRef}
        >
          {/* 頂部色條 + 關閉 */}
          <div className="relative">
            <div className="h-6 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600" />
            <button
              className="absolute top-0 right-0 text-white/90 text-lg px-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
              onClick={handleClose}
              aria-label="關閉公告"
            >
              ×
            </button>
          </div>

          {/* 內容 */}
          <div className="p-6 space-y-4">
            <div className="text-sm text-gray-800">
              <strong id="announce-title" className="block mb-1 text-xl text-purple-700">
                全新娛樂體驗！
              </strong>
              <p id="announce-desc">
                加入全台最火線上娛樂城，捕魚機、老虎機、真人百家樂天天送獎金！
              </p>
            </div>

            {/* Lottie（尊重減少動畫偏好） */}
            {!prefersReducedMotion && (
              <div className="mt-2">
                <Lottie animationData={diceAnimation} loop style={{ height: 100 }} />
              </div>
            )}

            <Link
              href="https://www.99ubit.com/#/?superid=eric60"
              rel="nofollow noopener"
              target="_blank"
              className="block"
            >
              <button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-sm font-semibold py-2 rounded-md transition duration-200"
              >
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
