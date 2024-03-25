import { Route, Routes } from "react-router-dom";

import Hero from "./Components/Hero";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
