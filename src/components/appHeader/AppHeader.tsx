import {NavLink, Link, useLocation} from 'react-router-dom'
import './appHeader.scss';

const activeColor = '#9f0013';

const AppHeader = ()  => {
    const location = useLocation();
    const state = location.state
    const isComicOpenedFromCharacters = location.pathname.startsWith('/comics/') && state?.from === 'characters';

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>


            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink
                        end
                        style={({isActive}: { isActive: boolean }) => ({
                            color: isActive || isComicOpenedFromCharacters ? activeColor : 'inherit'
                        })}
                        to='/'>Characters</NavLink></li>

                    <li><NavLink
                        style={({isActive}: { isActive: boolean }) => ({
                            color: isActive && !isComicOpenedFromCharacters ? activeColor : 'inherit'
                        })}
                        to='/comics'>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;