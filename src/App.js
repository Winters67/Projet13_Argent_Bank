import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Hearder/Hearder";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === "/login" || location.pathname === "/" ? (
        <Header />
      ) : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
