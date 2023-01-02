import { useState } from "react";
import AskNo from "../Components/AskNo";
import Asks from "../Components/Asks";
import Header from "../Components/Header";
import Input from "../Components/Input";
import More from "./More";

const Home = () => {
    const [visible, setVisible] = useState(true) ; 

    const onClick = (event) => {
        event.preventDefault() ;
        setVisible(!visible)
    } ; 

    return (
        <div className="Home">
            <div className="HomeContainer">
                <Header />
                <Asks />
                <AskNo />
                {/* <Input /> */}
                <button className='HomeMore' onClick={onClick}> More </button>
                {visible ? null : <More />}
            </div>
        </div>
    )
}

export default Home ; 