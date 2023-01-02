import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../firebase";

const ShareHeader = () => {
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

    return (
        <>
        {user &&
          <>
          <div className="Header">
              <div className='HeaderContainer'>
                <img src={user.photoURL} alt="" 
                    style = {{width: "50px", height: "50px"}}/>
                <h5> {user.displayName} </h5>
              </div>
          </div>
          </>}
        </>
    )
}

export default ShareHeader ; 