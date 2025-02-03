import { Montserrat } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Wordle AI",
  description: "AI-powered Wordle game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <AppProvider>
          <Navbar />
          {/* SettingsPanel global olarak ekleniyor */}
          <SettingsPanel />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
