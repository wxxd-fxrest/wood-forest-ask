import { useState } from "react";
import ShareAsks from "../Share/ShareAsks";
import ShareHeader from "../Share/ShareHeader";
import ShareInput from "../Share/ShareInput";
import More from "./More";

const ShareHome = () => {
    const [visible, setVisible] = useState(true) ; 

    const onClick = (event) => {
        event.preventDefault() ;
        setVisible(!visible)
    } ; 

    return (
        <div className="Home">
            <div className="HomeContainer">
                <ShareHeader />
                <ShareAsks />
                <ShareInput />
                <button className='HomeMore' onClick={onClick}> More </button>
                {visible ? null : <More />}
            </div>
        </div>
    )
}

export default ShareHome ; 