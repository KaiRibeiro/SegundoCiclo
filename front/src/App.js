import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/Register/Register";
import Principal from "./views/Principal/Principal";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Principal />} />
        <Route exact path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
