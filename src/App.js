import Home from "./routes/Home";
import Page from "./routes/Page";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
function App() 

{
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page/:digitId" element={<Page /> } />
    </Routes>
  </Router>
  );
}

export default App;
