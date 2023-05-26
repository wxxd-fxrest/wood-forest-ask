import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { dbService } from "../firebase";
import Ask from "./Ask";

const Asks = () => {
  const {currentUser} = useContext(AuthContext) ; 
  const [ask, setAsk] = useState([]) ; 

    const askDoc = async() => {
        dbService.collection("Chat").doc(currentUser.uid)
                 .collection("Message")
                 .onSnapshot((snapshot) => {
            let askArray = snapshot.docs.map(doc => ({
                ...doc.data(),
            })) ; 
            setAsk(askArray) ; 
        })
    } ; 


    useEffect(() => {
        askDoc()
    }, []) ; 

    return (
        <div className="Asks">
            <Ask ask={ask} /> 
        </div>
    )
}

export default Asks ; 