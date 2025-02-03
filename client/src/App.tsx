import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { WSProvider } from "./context/WebSocket";

function App() {
  return (
    <Router>
      <WSProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </WSProvider>
    </Router>
  );
}

export default App;
