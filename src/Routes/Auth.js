import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "../firebase";
import Img from "../img/attach.png" ; 
import { v4 as uuidv4 } from 'uuid';
import { updateProfile } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

const Auth = () => {
    const [err, setErr] = useState(false) ; 
    const [displayName, setDisplayName] = useState("") ; 
    const [email, setEmail] = useState("") ; 
    const [password, setPassword] = useState("") ; 
    const [attachment, setAttachment] = useState("") ; 
    const navigate = useNavigate();

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "displayName") {
            setDisplayName(value) ;
        } else if (name == "email") {
            setEmail(value) ; 
        } else if (name == "password") {
            setPassword(value) ;
        }
    } ;

    const onSubmit = async (event) => {
        event.preventDefault() ; 
        try {
            const data = await authService.createUserWithEmailAndPassword(email, password) ; 
            console.log(data)
            let attachmentUrl = "" ; 
            if(attachment) {
                const attachmentRef = storageService
                                        .ref()
                                        .child(`${data.user.uid}/${uuidv4()}`) ; 
                const response = await attachmentRef.putString(attachment, "data_url") ;
                attachmentUrl = await response.ref.getDownloadURL() ; 
                await updateProfile(data.user, {
                    displayName, 
                    photoURL: attachmentUrl,
                }) ; 
                await dbService.collection("Users").doc(data.user.uid).set({
                    uid: data.user.uid, 
                    displayName, 
                    email,
                    photoURL: attachmentUrl,
                    date: Timestamp.now(), 
                })
                await dbService.collection("Chat").doc(data.user.uid).set({}); 
                // await dbService.collection("CHATS").doc("ask "+data.user.uid).set({}); 
                navigate("/");
            }
        } catch (err) {
            alert("다시 확인해주세요. (ex, 이미 가입된 정보 또는 이미 사용 중인 이메일입니다.)")
            setErr(true) ; 
        }
    } ;

    const onFileChange = (event) => {
        const {target: {files}} = event ; 
        const theFile = files[0] ; 
        const reader = new FileReader() ; 
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent ; 
            setAttachment(result) ; 
        } ;
        if (Boolean(theFile)) {
        reader.readAsDataURL(theFile) ; 
        }
    } ; 

    return (
        <div className="Auth">  
            <div className="AuthContainer">
                <span> Ask  </span>
                <form onSubmit={onSubmit}>
                    <input type="text"
                           name="displayName"
                           placeholder="Display name"
                           required 
                           onChange={onChange}
                           value={displayName} />
                    {displayName && 
                    <h3> 회원가입 시 사진을 꼭 선택해주세요 </h3>}

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
                    
                    <label htmlFor="AuthFile" required> 
                        <img src={Img} alt="" className=''/>
                    </label>
                    <input type="file" 
                            name='file'
                            required
                            style = {{display : "none" }}
                            onChange={onFileChange}
                            id="AuthFile"/>

                    <button className="SingupBtn"> Sign Up </button>
                    <p> You do have an Account? </p>
                    <Link to="/login">
                        <button className="LoginBtn"> Log In </button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Auth ; 