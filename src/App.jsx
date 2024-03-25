import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import Navbar from "./Components/Navbar";
// import Hero from "./Components/Hero";
// import SignUpForm from "./Components/SignUpForm";
// import LogInForm from "./Components/LogInForm";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route
            path='/account'
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
