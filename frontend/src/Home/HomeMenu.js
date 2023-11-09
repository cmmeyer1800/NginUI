import { Icon, IconTextRight } from "../components/Icons";
import {MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight} from 'react-icons/md'

const HomeMenu = (props) => {
    return (
        <div className="box">
            { props.sideBarOpen &&
            <aside className="menu">
                <div className="menu-label">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">General</div>
                        </div>
                        <div className="level-right">
                            <a className="level-item" href="#null" onClick={(e) => {
                                e.preventDefault();
                                props.setSideBarOpen(false);
                            }}>
                                <Icon icon={<MdKeyboardDoubleArrowLeft/>}></Icon>
                            </a>
                        </div>
                    </div>
                </div>
                <ul className="menu-list">
                    <li><a href="/#Dashboard" onClick={(e) => {e.preventDefault(); props.setPage("dashboard")}}>Dashboard</a></li>
                    <li><a href="/#configs" onClick={(e) => {e.preventDefault(); props.setPage("config")}}>Configurations</a></li>
                </ul>
            </aside>
            }
            { !props.sideBarOpen && 
            <div className="is-fullheight">
                <a className="" href="#null" onClick={(e) => {
                    e.preventDefault();
                    props.setSideBarOpen(true);
                }}>
                    <IconTextRight icon={<MdKeyboardDoubleArrowRight/>}>Menu</IconTextRight>
                </a>
            </div>
            }
        </div>
    )
}

export default HomeMenu;