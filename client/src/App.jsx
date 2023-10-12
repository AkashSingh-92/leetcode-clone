import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import AddQuestion from "./admin/Question";
import Try from "./admin/Try"
import AddQuestionAndSample from "./admin/AddQuestionAndSample";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 



function App() {
  

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signin" element={<AdminLogin/>}></Route>
          <Route path="/addquestion" element={<AddQuestionAndSample/>}></Route>
        </Routes>
      </Router>
    </div>
  )
};

export default App;
