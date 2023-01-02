import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { dbService } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import No from "./No";


const AskNo = () => {
  const {currentUser} = useContext(AuthContext) ; 
  const [ask, setAsk] = useState([]) ; 
  const uuidv4ID = uuidv4()

    const askDoc = async() => {
        dbService.collection("Chat").doc(currentUser.uid)
                 .collection("Message")
                 .onSnapshot((snapshot) => {
            let askArray = snapshot.docs.map(doc => ({
                ...doc.data(),
            })) ; 
            // console.log(askArray)
            setAsk(askArray) ; 
        })
        // console.log(ask)
    } ; 


    useEffect(() => {
        askDoc()
    }, []) ; 

    return (
        <div className="AskNo">
            <No ask={ask}/>
        </div>
    )
}

export default AskNo ; 