import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { authService } from "../firebase";


const More = () => {
  const {currentUser} = useContext(AuthContext) ; 
  const navigate = useNavigate() ;

  const onSubmit = (event) => {
    event.preventDefault() ;
  }

  const onClickLogin = (event) => {
  }

  const onClickSignup = (event) => {
  }

  const onClickSignOut = () => {
    authService.signOut() ; 
    navigate("/auth")
    console.log("log out")
  }

  return (
    <div className="More">
      <form onSubmit={onSubmit} >
        {currentUser ? 
        <>
          <div className="MoreURL">
            <h4> URL </h4>
            <h6> https://wxxd-fxrest.github.io/wood-forest-ask/home/{currentUser.displayName}/{currentUser.uid} </h6>
          </div>
          <button className='MoreLogOutBtn'
                onClick={onClickSignOut}> Log Out 
          </button> 
        </>
          : <>
          <Link to="/login">
            <button className='MoreLogBtn' 
                    onClick={onClickLogin}> 
                    Log in 
            </button>
          </Link>
          <Link to="/auth">
          <button className='MoreSignBtn' 
                  onClick={onClickSignup}>
                  Sign up 
          </button>
          </Link>
        </> }
      </form>
    </div>
  );
}

export default More;
