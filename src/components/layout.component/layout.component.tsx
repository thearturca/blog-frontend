import { Link, Outlet } from "react-router-dom"
import HeaderComponent from "../header.component/header.component"
import "./layout.component.css"


function LayoutComponent() {
    return (
        <>
        <HeaderComponent />
        <hr></hr>
        <main>
            <Outlet />
        </main>
        <footer>
            <Link to="/docs" target="_blank" rel="noopener noreferrer" >Swagger documentation</Link>
        </footer>
        </>
    )
}

export default LayoutComponent