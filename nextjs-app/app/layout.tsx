import "./globals.css";

export const metadata = {
  title: "Tourism Insights"
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
