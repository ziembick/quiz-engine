import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css"
import Footer from "./components/Footer";
import Start from "./components/Start";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: ['--font-poppins']
});

const montSerrat = Montserrat ({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: ['--font-montserrat']
})

export const metadata = {
  title: "SiPhox Health Quiz - Paulo Ziembick",
  description: "Created by Paulo Ziembick",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  ${styles.body} ${montSerrat.className}`}>
        {children}
        <Footer />
        </body>
    </html>
  );
}
