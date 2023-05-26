import { useEffect, useState } from "react";
import Attach from "../img/attach.png" ; 
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "../firebase";
import { arrayUnion } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ShareInput = () => {
    const [user, setUser] = useState("");
    const { displayName } = useParams();
    const { uid } = useParams();
    const [sendAsk, setSendAsk] = useState("") ; 
    const [attachment, setAttachment] = useState("") ; 
    const uuidv4ID = uuidv4()

    useEffect(() => {
        dbService.collection("Users").where("displayName", "==", displayName ).where("uid", "==", uid )
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setUser(doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }, []) ;

    const onSubmit = async (event) => {
    event.preventDefault() ; 
    
    let attachmentUrl = "" ; 
    if(attachment !== "") {
        const attachmentRef = storageService
                            .ref()
                            .child(`${uid}/${uuidv4()}`) ; 
        const response = await attachmentRef.putString(attachment, "data_url") ;
        attachmentUrl = await response.ref.getDownloadURL() ; 
    } ;
    setSendAsk("") ; 
    setAttachment("") ; 
    dbService.collection("Chat").doc(uid).collection("Message").doc(uuidv4ID).set({})
    const shareUp = dbService.collection("Chat").doc(uid)
                             .collection("Message").doc(uuidv4ID)
        console.log(1)
            return shareUp.update({
            messages : arrayUnion({
                onwerId: uid,
                text: sendAsk, 
                UUID: uuidv4ID, 
                date: Date.now(), 
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
        <div className="ShareInput"> 
            <form onSubmit={onSubmit}>
            {attachment && 
                <div className='ShareInputIMGview' onClick={onClearAttachmentClick}>
                    <img src={attachment} width="50px" height="50px" />
                    <button> x </button>
                </div> }
            <input type="text"
                   placeholder="Type something..." 
                   onChange={onChange}
                   value={sendAsk} 
                   className="ShareInputText"/>
            <div className="ShareInputBtnContainer">
                <input type="file"
                        style={{display:"none"}}
                        id="inputFile"
                        onChange={onFileChange}/>

                <label htmlFor="inputFile">
                    <img src={Attach} alt="" />
                </label>
            </div>
                <input type="submit" value="OK" className="ShareInputOKBtn"/>
            </form>
        </div>
    )
}

export default ShareInput ; 