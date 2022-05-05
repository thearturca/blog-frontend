import { Outlet } from "react-router-dom"
import HeaderComponent from "../header.component/header.component"


function LayoutComponent() {
    return (
        <>
        <HeaderComponent />
        <hr></hr>
        <main>
            <Outlet />
        </main>
        </>
    )
}

export default LayoutComponent