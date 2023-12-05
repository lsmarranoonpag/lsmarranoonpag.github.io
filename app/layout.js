import './globals.css'
import { Poppins } from 'next/font/google'

const inter = Poppins({ weight: "400", subsets: ['latin-ext'] })

export const metadata = {
  title: 'Portal da Loja',
  description: 'Portal da Loja',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property='og:locale' content='pt_BR' />
        <link rel="stylesheet" href={inter} />
      </head>
      <body>

          {children}

      </body>
    </html>
  )
}
