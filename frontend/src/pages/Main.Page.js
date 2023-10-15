import { Fragment } from "react"
import Navbar from "../components/shared/Navbar"
import Main from "../components/Main"
import Bottombar from "../components/shared/Bottombar"

const MainPage = () => {
    return (
        <Fragment>
            <Navbar />
            <Main />
            <Bottombar />
        </Fragment>
    )
}

export default MainPage