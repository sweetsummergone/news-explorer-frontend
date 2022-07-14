import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import Burger from "../../images/menu.svg";
import Cross from "../../images/plus.svg";

export default function Header({ onSignUp }) {
    const [isOpened, setIsOpened] = useState(false);
    const WIDTH_MOBILE = 320;

    const { width } = useWindowDimensions();

    if (width > WIDTH_MOBILE) return (
        <header className="header">
            <p className="header__title">{width}</p>
            <Navigation isOpened={true} onSignUp={onSignUp}/>
        </header>
    )
    return (
        <>
            <header className="header">
                <p className="header__title">NewsExplorer</p>
                <img onClick={() => setIsOpened(!isOpened)} className="header__toggler" alt="menu" src={isOpened ? Cross : Burger} style={{transform: isOpened && "rotate(45deg)"}}/>
            </header>
            {isOpened && 
                <>    
                    <div className="modal__overlay" />
                    <Navigation isOpened onSignUp={onSignUp}/>
                </>
            }
        </>
    )
}