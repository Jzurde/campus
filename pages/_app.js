import Layout from '@/components/layout'
import '@/styles/globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

import '@fortawesome/fontawesome-svg-core/styles.css'
import {config} from '@fortawesome/fontawesome-svg-core'
import { _siteSettings } from '@/components/_constant'
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={_siteSettings.googleAnalytics.key} />
    </Layout>
  )
}
