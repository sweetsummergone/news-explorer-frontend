import { useState, useContext } from "react";
import Navigation from "../Navigation/Navigation";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import Burger from "../../images/menu.svg";
import Cross from "../../images/plus.svg";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SavedNewsHeader() {
    const { currentUser } = useContext(CurrentUserContext);
    const [isOpened, setIsOpened] = useState(false);
    const WIDTH_MOBILE = 767;

    const { width } = useWindowDimensions();

    if (width > WIDTH_MOBILE) return (
        <header className="header header__theme--dark">
            <p className="header__title header__title_theme--dark">NewsExplorer</p>
            <Navigation name={currentUser.name} isOpened={true} auth />
        </header>
    )
    return (
        <>
            <header className="header header__theme--dark">
                <p className="header__title header__title_theme--dark">NewsExplorer</p>
                <img onClick={() => setIsOpened(!isOpened)} className="header__toggler header__toggler_theme--dark" alt="menu" src={isOpened ? Cross : Burger} style={{transform: isOpened && "rotate(45deg)"}}/>
            </header>
            {isOpened && 
                <>    
                    <div onClick={() => setIsOpened(false)} className="modal__overlay" />
                    <Navigation name={currentUser.name} isOpened auth/>
                </>
            }
        </>
    )
}