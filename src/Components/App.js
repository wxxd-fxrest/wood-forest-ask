import "../App.modul.css"
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import Login from "../Routes/Login";
import ShareHome from "../Routes/ShareHome";


const App = () => {
  const {currentUser} = useContext(AuthContext) ; 

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" /> 
    }
    return children ;
  }; 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route>
            <Route index element={
                <ProtectedRoute>
                <Home />
                </ProtectedRoute> } />            
              <Route path='/auth' element={<Auth />} />
              <Route path='/login' element={<Login />} />
              <Route path='/home/:displayName/:uid' element={<ShareHome />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
