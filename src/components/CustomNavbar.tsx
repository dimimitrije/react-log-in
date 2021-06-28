import React, { useContext } from "react";
import { Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink } from "reactstrap";
import UserContext from "../context/UserContext";


interface CustomNavbarProps {
    isLoggedin: boolean;
    handleLogOut: () => void

}

export default function CustomNavbar(props: CustomNavbarProps) {

    const { isLoggedin, handleLogOut } = props
    const user = useContext(UserContext)

    return (
        <Navbar color="dark" dark expand="xs" className='navBar'>
        <NavbarBrand href="/">Zaven</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/dashboard">Dashboard</NavLink>
          </NavItem>
          <NavItem>
            {isLoggedin ? <NavLink href="/" onClick={handleLogOut}>Log out</NavLink> : <NavLink href="/login">Log in</NavLink>}
          </NavItem>
        </Nav>
        <NavbarText>{user.firstName} {user.lastName}</NavbarText>
      </Navbar>)
}