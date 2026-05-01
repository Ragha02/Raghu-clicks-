import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: "Raghu's Adobe",
  description: 'Creative Engineer & Photographer',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
