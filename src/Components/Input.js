import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Attach from "/Users/drizzle/Desktop/프로젝트/Wood-Forest/wood-forest-ask/src/img/attach.png" ; 
import Img from "/Users/drizzle/Desktop/프로젝트/Wood-Forest/wood-forest-ask/src/img/attach.png" ;  
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "../firebase";
import { arrayUnion, Timestamp } from "firebase/firestore";

const Input = () => {
    const [attachment, setAttachment] = useState("") ; 
    const {currentUser} = useContext(AuthContext) ; 
    const [sendAsk, setSendAsk] = useState("") ; 
    const uuidv4ID = uuidv4()

    const onSubmit = async (event) => {
    event.preventDefault() ; 
    
    let attachmentUrl = "" ; 
    if(attachment !== "") {
        const attachmentRef = storageService
                            .ref()
                            .child(`${currentUser.uid}/${uuidv4()}`) ; 
        const response = await attachmentRef.putString(attachment, "data_url") ;
        attachmentUrl = await response.ref.getDownloadURL() ; 
    } ;

    setSendAsk("") ; 
    setAttachment("") ; 
    const shareUp = dbService.collection("Chat").doc(currentUser.uid)
                            //  .collection("MESSAGE_UUID").doc(uuidv4ID)
                            //  .collection("MESSAGE_UUID").doc("ask")
        console.log(1)
            return shareUp.update({
            messages : arrayUnion({
                senderId: currentUser.uid,
                text: sendAsk, 
                UUID: uuidv4ID, 
                date: Timestamp.now(),
                attachmentUrl,
            })
        })
    } ; 

    const onChange = (event) => {
        const {target: {value}} = event ; 
        setSendAsk(value) ; 
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

    const onClearAttachmentClick = () => setAttachment(null) ; 

    return (
        <div> 
            <form onSubmit={onSubmit}>
            <input type="text"
                   placeholder="Type something..." 
                   onChange={onChange}
                   value={sendAsk}/>
            <div>
                <img src={Attach} alt="" />
                <input type="file"
                        style={{display:"none"}}
                        id="inputFile"
                        onChange={onFileChange}/>

                <label htmlFor="inputFile">
                    <img src={Img} alt="" />
                </label>
            </div>
                <input type="submit" value="OK"/>
                {attachment && 
                <div className='InputIMGview' onClick={onClearAttachmentClick}>
                    <img src={attachment} width="50px" height="50px" />
                    <button> x </button>
                </div> }
            </form>
        </div>
    )
}

export default Input ; 