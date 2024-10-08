import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Slider from "./components/Slider";
import ProjectPage from "./components/ProjectPage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  useGSAP(() => {
    gsap.fromTo(
      "body",
      { opacity: 0, clipPath: "inset(50% 50% 50% 50%)" },
      {
        duration: 1,
        delay: 0.2,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set("body", {
            clipPath: "none",
          });
        },
      }
    );
  }, []);

  return (
    <Router>
      <Slider />
      <Routes>
        <Route path="/*" element={<ProjectPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
