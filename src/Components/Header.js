import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

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