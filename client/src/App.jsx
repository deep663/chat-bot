import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AdminPage from "./components/Admin";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<Main />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
