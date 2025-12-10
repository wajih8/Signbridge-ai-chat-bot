import "./globals.css";

export const metadata = {
  title: "My App",
  description: "Next.js + Tailwind v4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
