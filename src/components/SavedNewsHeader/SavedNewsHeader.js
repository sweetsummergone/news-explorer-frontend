import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import Burger from "../../images/menu.svg";
import Cross from "../../images/plus.svg";

export default function SavedNewsHeader() {
    const [isOpened, setIsOpened] = useState(false);
    const WIDTH_MOBILE = 767;

    const { width } = useWindowDimensions();

    if (width > WIDTH_MOBILE) return (
        <header className="header header_--dark">
            <p className="header__title header__title--dark">NewsExplorer</p>
            <Navigation isOpened={true} auth />
        </header>
    )
    return (
        <>
            <header className="header header_--dark">
                <p className="header__title header__title--dark">NewsExplorer</p>
                <img onClick={() => setIsOpened(!isOpened)} className="header__toggler header__toggler--dark" alt="menu" src={isOpened ? Cross : Burger} style={{transform: isOpened && "rotate(45deg)"}}/>
            </header>
            {isOpened && 
                <>    
                    <div onClick={() => setIsOpened(false)} className="modal__overlay" />
                    <Navigation isOpened auth/>
                </>
            }
        </>
    )
}