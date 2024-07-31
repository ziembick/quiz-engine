import Image from "next/image";
import styles from "./page.module.css";
import Quiz from "./components/Quiz";
import Start from "./components/Start";

export default function Home() {
  return (
    <main>
      <div>
        <Start />
      </div>
    </main>
  );
}
