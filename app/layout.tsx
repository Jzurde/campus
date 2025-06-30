import { Noto_Sans_JP } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Header from '@/components/header/header';
import '@/app/globals.css';
import styles from './layout.module.css';
import Footer from '@/components/footer/footer';
import { getSiteSettings } from '@/lib/cms-api';
config.autoAddCss = false;

const NotoSansJP = Noto_Sans_JP({
  weight: ["800", "500"],
  subsets: ["latin"]
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const siteSetting = await getSiteSettings("googleAnalytics");
  const analyticsKey = siteSetting?.googleAnalytics;

  return (
    <html lang="ja">
      <body className={`${NotoSansJP.className}`}>
        <div className={styles.non_flow}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
        {(analyticsKey)&&<GoogleAnalytics gaId={analyticsKey} />}
      </body>
    </html>
  );
}
