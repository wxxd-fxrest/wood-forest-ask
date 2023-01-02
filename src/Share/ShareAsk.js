import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { dbService } from "../firebase";

const ShareAsk = ({ask}) => {
    const [sendAsk, setSendAsk] = useState("") ; 
    const uuidv4ID = uuidv4()
    const [err, setErr] = useState(false) ; 
    const [user, setUser] = useState("");
    const { displayName } = useParams();
    const { uid } = useParams();

    useEffect(() => {
        dbService.collection("Users").where("displayName", "==", displayName ).where("uid", "==", uid )
        // dbService.collection("Users").where("uid", "==", uid )
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            //   console.log(doc.data())
            //   console.log(doc.data().uid)
              setUser(doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }, []) ;

    const ii = () => {
        let arr = [] ;
        for(let i = 0; i < ask.length; i++) {
            // console.log(ask[i])
            // console.log(ask[i].messages[0].text)
            // console.log(ask[i].messages[1].text)
            arr.push (
                <div  key={i.id} className="ShareAsk">
                    {ask[i] ?
                    <>
                    <div className="chat-content">
                        {ask[i].messages[1] ? 
                        <>
                        <div className="ShareAskBubbleContainer">
                            {ask[i].messages[0] && 
                            <>
                                {ask[i].messages[0].attachmentUrl && 
                                <img src={ask[i].messages[0].attachmentUrl} alt="" />}
                                <h4> {ask[i].messages[0].text} </h4> 
                            </>}
                        </div>
                        </> : <div className="ShareAskHidden">
                                <p> .ᐟ 답변 후 확인할 수 있습니다. </p>
                            </div>}

                            <div className="ShareAskMine">
                            {ask[i].messages[1] ? <>
                                <div className="ShareAskMineBubbleContainer">
                                    {ask[i].messages[1].attachmentUrl && 
                                    <img src={ask[i].messages[1].attachmentUrl} alt="" />} 
                                    <h6> {ask[i].messages[1].text} </h6>
                                </div>
                            </> : null }
                        </div>
                    </div>
                    </> : null}
                </div>
            )}
        return arr; 
    }

    
    return (
        <div> 
            {ii()}
        </div>
    )
} ;

export default ShareAsk ; 