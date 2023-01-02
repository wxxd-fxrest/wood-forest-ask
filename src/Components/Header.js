import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { authService } from "../firebase";
import More from "../Routes/More";

const Header = () => {
  const {currentUser} = useContext(AuthContext) ; 

    return (
        <>
        {currentUser &&
          <>
          <div className="Header">
              <div className='HeaderContainer'>
                <img src={currentUser.photoURL} alt="" 
                    style = {{width: "50px", height: "50px"}}/>
                <h5> {currentUser.displayName} </h5>
              </div>
          </div>
          </>}
        </>
    )
}

export default Header ; 