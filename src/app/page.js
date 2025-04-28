import Image from "next/image";
import Home from "../pages/Home.js"
import Footer from '../components/Footer.js'
import styles from "./page.module.css";

export default function App() {
  return (
    <div>
      <Home />
      <Footer />
    </div>
  );
}
