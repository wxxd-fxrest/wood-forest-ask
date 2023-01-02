import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { dbService } from "../firebase";
import Ask from "./Ask";
import { v4 as uuidv4 } from 'uuid';
import { doc } from "firebase/firestore";


const Asks = () => {
  const {currentUser} = useContext(AuthContext) ; 
  const [ask, setAsk] = useState([]) ; 
  const uuidv4ID = uuidv4()

    const askDoc = async() => {
        // let docItem = [];
        // dbService.collection("Chat").doc(currentUser.uid)
        //          .collection("Message")
        //          .get()
        //          .then((snap) => {
        //             snap.forEach((doc) => {
        //                 docItem.push(doc.data())
        //                 setAsk(docItem)
        //             });
        //     console.log(ask)
        // })

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
        <div className="Asks">
            <Ask ask={ask} /> 
            {/* {ask.map((m, o) => (
                <Ask key={o} ask={m.messages}/>
            ))} */}

            {/* {docid.map((v) => {
                return (
                    <li> {v.messages} </li>
                )
            })} */}

            {/* {Object.entries(docid)?.map((chat) => {
                return (
                    <div key={chat[0]}>
                        <h4>{chat[1].text}</h4>
                        <h4>{chat[1].messages}</h4>
                    </div>
                )
            })} */}
        

        {/* {ask.map((a, d) => {
          return(
            <div key={d}>
                <p> {a.text} </p> 
                <p> {a.text} </p> 
            </div>
          )
        })} */}
        </div>
    )
}

export default Asks ; 