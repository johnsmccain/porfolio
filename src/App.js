import React, { useContext } from "react";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";

import ProductList from "./components/productList/ProductList";
import Toggle from "./components/Toggke/Toggle";
import { ThemeContext } from "./contex";

function App() {
  const theme = useContext(ThemeContext);
  const dark = theme.state.darkMode;
  return (
    <div
      className="container"
      style={{
        backgroundColor: dark ? "#000" : "#eee",
        color: dark ? "#ddd" : "#333",
      }}
    >
      <Toggle />
      <Intro />
      <About />
      <ProductList />
      <Contact />
    </div>
  );
}

export default App;
