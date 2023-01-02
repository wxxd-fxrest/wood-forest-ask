import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../firebase";
import ShareAsk from "./ShareAsk";

const ShareAsks = () => {
    const [user, setUser] = useState("");
    const [ask, setAsk] = useState([]) ; 
    const { displayName } = useParams();
    const { uid } = useParams();

    const URLInfo = () => {
        dbService.collection("Users").where("displayName", "==", displayName ).where("uid", "==", uid )
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            //   console.log(doc.data())
              setUser(doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    } ;

    const askDoc = () => {
        let docItem = [];
        dbService.collection("Chat").doc(uid)
                 .collection("Message")
                 .get()
                 .then((snap) => {
                    snap.forEach((doc) => {
                        docItem.push(doc.data())
                        setAsk(docItem)
                    });
        })
    } ;
 
    useEffect(() => {
        URLInfo()
        askDoc()
    }, []) ;

    return (
        <div className="ShareAsks">
            <ShareAsk ask={ask}/>
        </div>
    )
}

export default ShareAsks ; 