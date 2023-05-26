import Attach from "../img/attach.png" ; 
import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { dbService, storageService } from "../firebase";
import { arrayUnion } from "firebase/firestore";

const No = ({ask}) => {
    const [attachment, setAttachment] = useState("") ; 
    const {currentUser} = useContext(AuthContext) ; 
    const [sendAsk, setSendAsk] = useState("") ; 
    const [askID, setAskID] = useState("") ; 
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
                             .collection("Message").doc(askID)
        console.log("전송")
            return shareUp.update({
            messages : arrayUnion({
                senderId: currentUser.uid,
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

    const onClick = (event) => {
        const {target : {value}} = event ; 
            event.preventDefault() ;
            setAskID(value)
            console.log(askID)
    } ;

    const onClickDelete = (event) => {
        const {target : {value}} = event ; 
            event.preventDefault()
            setAskID(value)
        if(askID) {
            Delete()
        } else {
            alert("삭제 할 게시글을 다시 한 번 클릭해주세요.")
        }
    }

    const Delete = () => {
        let result = window.confirm("Ask를 삭제하시겠습니까?") ; 
        if(result) {
            dbService.collection("Chat").doc(currentUser.uid)
            .collection("Message").doc(askID)
            .delete().then(() => {
                alert("삭제되었습니다.")
            }).catch((error) => {
               console.error("Error removing document: ", error) ;
            })
        }
    }

    const onClearAttachmentClick = () => setAttachment(null) ; 

    const ii = () => {
        let arr = [] ;
        for(let i = 0; i < ask.length; i++) {
            arr.push (
                <div  key={i.id} className="No">
                    {ask[i] ? <>
                        <div className="chat-content">
                            {!ask[i].messages[1] ?
                            <>
                                <div className="AskBubbleContainer">
                                    {ask[i].messages[0].attachmentUrl && 
                                    <img src={ask[i].messages[0].attachmentUrl} alt="" />}
                                    <h4> {ask[i].messages[0].text} </h4>
                                </div>
                                <button value={ask[i].messages[0].UUID} 
                                        onClick={onClick}
                                        className="AskOKBtn"> 
                                    답장 
                                </button>
                                {ask[i].messages[0].UUID == askID && 
                                <>
                                <form onSubmit={onSubmit}>
                                        {attachment && 
                                            <div className='NoInputIMGview' onClick={onClearAttachmentClick}>
                                                <img src={attachment} width="50px" height="50px" />
                                                <button> x </button>
                                            </div> }
                                        <input type="text"
                                            placeholder="Type something..." 
                                            onChange={onChange}
                                            value={sendAsk}
                                            className="NoInputText"/>
                                        <div className="NoBtnContainer">
                                            <input type="file"
                                                    style={{display:"none"}}
                                                    id="inputFile"
                                                    onChange={onFileChange}/>

                                            <label htmlFor="inputFile">
                                                <img src={Attach} alt="" />
                                            </label>
                                        </div>
                                        <input type="submit" value="OK" className="NoOKBtn"/>
                                    </form>
                                </>}
                                <button value={ask[i].messages[0].UUID} 
                                        onClick={onClickDelete}
                                        className="AskXBtn"> 
                                    삭제 
                                </button>
                            </> : null }
                        </div>
                    </> : null}
                    
                </div>
            )}
        return arr; 
    }

    return (
        <div className="NoReturn"> 
            {ii()}
        </div>
    )
} ;

export default No ; 