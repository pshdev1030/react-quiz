import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Question from "./pages/Question";
import Result from "./pages/Result";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Main />}></Route>
          <Route path="question/:id" element={<Question />}></Route>
          <Route path="result" element={<Result />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
