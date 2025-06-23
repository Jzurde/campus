import { Noto_Sans_JP } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Header from '@/components/header/header';
import '@/app/globals.css';
import styles from './layout.module.css';
import Footer from '@/components/footer/footer';
config.autoAddCss = false;

const NotoSansJP = Noto_Sans_JP({
  weight: ["800", "500"],
  subsets: ["latin"]
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${NotoSansJP.className}`}>
        <div className={styles.non_flow}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
        <GoogleAnalytics gaId="G-PRH832W7M3" />
      </body>
    </html>
  );
}
