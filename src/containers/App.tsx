import { BrowserRouter as Router } from "react-router-dom"; // For React Router v6
import AppRoutes from "../routes";

function App() {
  return (
    <div className="bg-gray-200">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
