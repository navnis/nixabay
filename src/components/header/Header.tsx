import { FC } from 'react';
import './header.scss'
import logo from '../../assets/images/nixabay.png'
import user from '../../assets/images/user.svg'

interface IProps {
    tabItems: Array<{
        name: string
        id: string
        route: string
    }>
}

const Header: FC<IProps> = ({ tabItems }) => {
    return (
        <div className="header">
            <div className="header_main">
                <div className="logo_with_tabs">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="tabs">
                        <ul>
                            {tabItems.map(item => <li key={item.id}>{item.name}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="profile_pic">
                    <img src={user} alt="profile" />
                </div>
            </div>
        </div>
    );
}

export default Header;