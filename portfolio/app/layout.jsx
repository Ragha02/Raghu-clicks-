import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
