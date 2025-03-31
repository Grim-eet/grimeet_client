import type { Metadata } from "next";
import "./globals.css";
import ReactQueryClientProvider from "../../config/ReactQueryClientProvider";

export const metadata: Metadata = {
  title: "Grimeet",
  description: "함께 꿈을 그려보아요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`antialiased`}>{children}</body>
      </html>
    </ReactQueryClientProvider>
  );
}
