import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/app.css'
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import BrowseEscapes from './components/Inspirations';
import MakeMyEscapes from './components/MakeMyEscapes';
import ViewMyEscapes from './components/ViewMyEscapes';
import EscapeUpdate from './components/EscapeUpdate';
import EscapeDetails from './components/EscapeDetails';
import Login from "./components/Login";
import Register from "./components/Registration";
import { AuthProvider } from "./components/AuthContext";
import Activities from "./components/Activities";
import React from "react";

function App() {

  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/inspiration/category_1" element={<Inspirations />} />
            <Route path="/inspiration/category_2" element={<Inspirations />} />
            <Route path="/inspiration/category_3" element={<Inspirations />} />
            <Route path="/inspiration/category_all" element={<Inspirations />} /> */}
            <Route path="/escapes" element={<BrowseEscapes />} />
            <Route path="/escapes/:id" element={<EscapeDetails />} />
            <Route path="/escapes/:id/update" element={<EscapeUpdate />} />
            <Route path="/my_escapes" element={<ViewMyEscapes />} />
            <Route path="/my_new_escapes" element={<MakeMyEscapes />} />
            <Route path="/my_new_escapes/:id/activities" element={<Activities />} />
            <Route path="/login" element={<Login />} />
            <Route path ="/register" element={<Register />} />
          </Routes>
        {/* <Footer /> */}
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
