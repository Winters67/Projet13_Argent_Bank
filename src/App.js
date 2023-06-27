import { Routes, Route } from "react-router-dom";
import Hearder from "./components/Hearder/Hearder";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";
import Signup from "./views/Signup/Signup";

function App() {
  return (
    <div className="App">
      <Hearder />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" component={<Signup />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
