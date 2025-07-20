import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import FlowNodeViewer from "./FlowNodeViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/flow" element={<FlowNodeViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
