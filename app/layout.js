import { Roboto } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import Header from "./Header"

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
        <Header />
        <div className="flex-1">{children}</div>
        <footer className="flex items-center flex-wrap justify-center bg-gray-100 border-t border-solid border-gray-300 p-5 gap-3">
          <p>Karolina Balszan</p>
          <i className="fa-solid fa-carrot"></i>
          <p> 2024</p>
        </footer>
        <div id="portal"></div>
      </body>
    </html>
  )
}
