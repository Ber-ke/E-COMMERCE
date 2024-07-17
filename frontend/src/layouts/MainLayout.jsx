import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import proptypes from "prop-types";
import Search from "../components/Modals/Search/Search.jsx";
import {useEffect, useState} from "react";
import Dialogs from "../components/Modals/Dialogs/Dialogs.jsx";

const MainLayout = ({children}) => {

    const [isSearchShow, setIsSearchShow] = useState(false);
    const [isModalShow, setIsModalShow] = useState(true);

    useEffect(() => {
        const dialogStatus = localStorage.getItem("dialog") ? JSON.parse(localStorage.getItem("dialog")) : localStorage.setItem("dialog", JSON.stringify(true));
        setTimeout(() => {
            setIsModalShow(dialogStatus);
        }, 2000);
    }, []);

    return (
        <div className="main-layout">
            <Dialogs isModalShow={isModalShow} setIsModalShow={setIsModalShow}/>
            <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow}/>
            <Header setIsSearchShow={setIsSearchShow}/>
            {children}
            <Footer/>
        </div>
    );
};

export default MainLayout;

MainLayout.propTypes = {
    children: proptypes.node
}