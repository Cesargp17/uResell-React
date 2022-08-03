import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AuthContext } from '../auth/context/AuthContext'
import { Dropdown, Avatar, Text, Grid, User, Image, Button } from "@nextui-org/react";
import { ThemeContext } from '../themes/ThemeContext';
import { CartContext } from '../cart/CartContext';

export const NavBar = () => {

    const { startSignOut, Usuario } = useContext(AuthContext);
    const { changeTheme, IconTheme } = useContext(ThemeContext);
    const { Productos } = useContext(CartContext);

    const logout = () => {
        startSignOut();
    }

    const changeThemePage = () => {
        changeTheme();
    }

    if(Usuario.status === 'auth') {
        return (
            <>
                <div className='divFirst bg-dark text-center'>
                    <h6 className='text-white fw-bold'>Envios a todo México</h6>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark fondoNavbar">
                    <div className="container px-5">
                    <Link className="navbar-brand tituloNavbar" to='/'>uResell</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavLink className={ ({ isActive }) => `nav-link textNavbar fw-bold ${ isActive ? 'active' : '' }`} to='/'>Inicio</NavLink>
                            <NavLink className={ ({ isActive }) => `nav-link textNavbar fw-bold ${ isActive ? 'active' : '' }`} to='/products'>Productos</NavLink>
                            <Link to='/cart' className="btn btn-outline-light" type="submit"><i className="bi-cart-fill me-1"></i> Cart <span className="badge bg-dark text-white ms-1 rounded-pill">{ Productos }</span></Link>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <a onClick={ changeThemePage } className='text-white fs-5 nav-link'>{ IconTheme }</a>
                            <li className="nav-item dropdown">
                                <Grid>
                                    <Dropdown placement="bottom-left">
                                    <Dropdown.Trigger>
                                        <User src={Usuario.photoURL}><Text className='text-white'>{ Usuario.nombre }</Text></User>
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu color="primary" aria-label="User Actions">
                                        {
                                            Usuario.rol === 'Administrador'
                                            ? <Dropdown.Item key="team_settings"><NavLink to='/admin'>Administración</NavLink></Dropdown.Item>
                                            : null
                                        }
                                        <Dropdown.Item key="help_and_feedback" withDivider><NavLink to='/pedidos'>Pedidos</NavLink></Dropdown.Item>
                                        <Dropdown.Item key="logout" color="error" withDivider>
                                        <NavLink className='text-danger' onClick={logout} to='/'>Cerrar Sesión</NavLink>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </Grid>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
      ) 
    }

  return (
        <>
            <div className='divFirst bg-dark text-center'>
                <h6 className='text-white fw-bold'>Envios a todo México</h6>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark fondoNavbar">
                <div className="container px-5">
                <Link className="navbar-brand tituloNavbar" to='/'>uResell</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <NavLink className={ ({ isActive }) => `nav-link textNavbar fw-bold ${ isActive ? 'active' : '' }`} to='/'>Inicio</NavLink>
                        <NavLink className={ ({ isActive }) => `nav-link textNavbar fw-bold ${ isActive ? 'active' : '' }`} to='/products'>Productos</NavLink>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <NavLink className={ ({ isActive }) => `nav-link textNavbar fw-bold ${ isActive ? 'active' : '' }`} to='/auth/login'>Iniciar Sesión</NavLink>
                    </ul>
                </div>
                </div>
            </nav>
        </>
  )
}
