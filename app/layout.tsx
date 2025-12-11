import "./globals.css";
import SessionProvider from "./providers/SessionProvider";
export const metadata = {
  title: "My App",
  description: "Next.js 16 + Tailwind v4 + TSX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
        </body>
    </html>
  );
}
