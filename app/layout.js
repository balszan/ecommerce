import { Roboto } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata = {
  title: "FoodShop",
  description: "Created with TailwindCSS, Stripe & Zustand",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${roboto.className} min-h-screen flex flex-col relative`}
      >
        <header className="sticky top-0 p-6 bg-white shadow-md z-50 text-2xl flex item-center justify-between">
          <Link href="/">
            <h1 className="hover:scale-110 cursor-pointer">FoodShop</h1>
          </Link>
          <i className="fa-solid fa-cart-shopping cursor-pointer hover:scale-110"></i>
        </header>
        <div className="flex-1">{children}</div>
        <footer>Footer</footer>
      </body>
    </html>
  )
}
