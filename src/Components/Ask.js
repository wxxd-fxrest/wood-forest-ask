import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { dbService } from "../firebase";

const Ask = ({ask}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [askID, setAskID] = useState("") ; 

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

    const ii = () => {
        let arr = [] ;
        for(let i = 0; i < ask.length; i++) {
            arr.push (
                <div  key={i.id} className="Ask">
                    {ask[i] &&
                    <div>
                        <div className="chat-content">
                            {ask[i].messages[1] && <>
                            {ask[i].messages[0].UUID && 
                            <>
                                <div className="AskBubbleContainer">
                                    {ask[i].messages[0].attachmentUrl && 
                                    <img src={ask[i].messages[0].attachmentUrl} alt="" />}
                                    <h4> {ask[i].messages[0].text} </h4>
                                </div>
                                <button value={ask[i].messages[0].UUID} 
                                        onClick={onClickDelete}
                                        className="AskXBtn"> 
                                    삭제 
                                </button>
                            </>}
                                <div className="AskMineBubbleContainer">
                                    {ask[i].messages[1].attachmentUrl && 
                                    <img src={ask[i].messages[1].attachmentUrl} alt="" />}
                                    <h4> {ask[i].messages[1].text} </h4>
                                </div>
                            </>}
                        </div>
                    </div> }
                </div>
            )}
        return arr; 
    }

    return (
        <div className="AskScroll"> 
            {ii()}
        </div>
    )
} ;

export default Ask ; 