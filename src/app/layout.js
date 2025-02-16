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
      {/* Dark mode yönetimini AppProvider üzerinden sağlıyorsak, 
          dark moddaysa body ya da html elementine .dark eklenmeli */}
      <body className={`${montserrat.className} antialiased`}>
        <AppProvider>
          <Navbar />
          <SettingsPanel />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
