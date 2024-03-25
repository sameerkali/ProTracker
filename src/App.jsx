import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./Components/Hero";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LogInForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
