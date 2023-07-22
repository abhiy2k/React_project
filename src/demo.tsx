import React from "react";
import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import FormPage from "./assets/FormPage";
import SecondPage from "./assets/SecondPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage/>} />
        <Route path="/second-page" element= {<SecondPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
