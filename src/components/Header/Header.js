import { useState, useContext } from "react";
import Navigation from "../Navigation/Navigation";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import Burger from "../../images/menu.svg";
import Cross from "../../images/plus.svg";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header({ onSignUp, isMain = false }) {
    const [isOpened, setIsOpened] = useState(false);
    const { isAuth, currentUser, handleUserLogout } = useContext(CurrentUserContext);
    const WIDTH_MOBILE = 767;

    const { width } = useWindowDimensions();

    if (width > WIDTH_MOBILE) return (
        <header className="header">
            <p className="header__title">NewsExplorer</p>
            <Navigation auth={isAuth} name={currentUser.name} isOpened={true} onSignUp={onSignUp} onLogout={handleUserLogout} isMain={isMain}/>
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
                    <div onClick={() => setIsOpened(false)} className="modal__overlay" />
                    <Navigation auth={isAuth} name={currentUser.name} isOpened onSignUp={onSignUp} onLogout={handleUserLogout} isMain={isMain}/>
                </>
            }
        </>
    )
}