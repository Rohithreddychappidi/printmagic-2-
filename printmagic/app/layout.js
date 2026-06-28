import "./globals.css";

export const metadata = {
  title: "PrintMagic — Customized Gifts",
  description:
    "Rakhis, phone covers, keychains and laser-engraved gifts, customized for you. Enquire directly on WhatsApp — no cart, no checkout, just a quick chat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
