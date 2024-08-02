import Image from "next/image";
import styles from "./page.module.css";
import Quiz from "./components/Quiz";
import Start from "./components/Start";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Start />

      <Footer />
    </main>
  );
}
