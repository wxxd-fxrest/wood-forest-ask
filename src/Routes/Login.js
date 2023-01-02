import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../firebase";

const Login = () => {
    const [err, setErr] = useState(false) ; 
    const [email, setEmail] = useState("") ; 
    const [password, setPassword] = useState("") ;
    const navigate = useNavigate();

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "email") {
            setEmail(value) ; 
        } else if (name == "password") {
            setPassword(value) ;
        }
    } ;

    const onSubmit = async (event) => {
        event.preventDefault() ; 
        try {
          const data = await authService.signInWithEmailAndPassword(email, password) ;
          navigate("/")
          console.log(data)
        } catch (err) {
          setErr(true) ;
          console.log(err.message)
          alert("이메일 또는 비밀번호를 확인하세요.")
        } ;
    } ;

    return (
        <div className="Login">  
            <div className="LoginContainer">
                <span> Ask </span>
                <form onSubmit={onSubmit}>
                    <input type="email"
                           name="email"
                           placeholder="Email"
                           required 
                           onChange={onChange}
                           value={email}/>

                    <input type="password"
                           name="password"
                           placeholder="Password"
                           required 
                           onChange={onChange}
                           value={password}/>
                           
                    <button className="LogLoginBtn"> Login </button>
                    <p> You do have an Account? </p>
                    <Link to="/auth">
                    <button className="LogSingupBtn"> Sing Up </button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login ; 