import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import AssignmentForm from "./pages/AssignmentForm";
import AssignmentDetail from "./pages/AssignmentDetail";
import NotFound from "./pages/NotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/pendataan" element={<AssignmentForm />} />

        <Route path="/responses/:id" element={<AssignmentDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
