import { FunctionComponent } from 'react';
import './appHeader.scss';
import { Link, Outlet } from 'react-router-dom';

const AppHeader: FunctionComponent = () => {
    return (
        <>
            <header className="app__header">
                <h1 className="app__title">
                    <Link to={'/'}>
                        <span>Marvel</span> information portal
                    </Link>
                </h1>
                <nav className="app__menu">
                    <ul>
                        <li><Link to={'/'}>Characters</Link></li>
                        <li><Link to={`comics`}>Comics</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>

    )
}

export default AppHeader;