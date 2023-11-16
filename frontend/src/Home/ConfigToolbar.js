import { useState } from 'react';
 
import { FaSync, FaCheck } from "react-icons/fa";
import { IconText } from "../components/Icons";
import Notification from '../components/Notification';

const SyncResolveModal = (props) => {
    return (
        <div className={`modal ${props.active ? 'is-active':''}`}>
            <div className="modal-background"></div>
            <div className="modal-content box">
                <p className="subtitle has-text-centered"><strong className='has-text-danger'>DB-OS Differences Detected</strong></p>
                <hr></hr>
                <div className='columns'>
                    <div className='column'>
                    <p className='subtitle'><strong>In Database Not In Nginx:</strong></p>
                    <br></br>
                        <ul>
                            {props.diffs && props.diffs.missing_from_os && props.diffs.missing_from_os.map((diff, index) => {
                                return (
                                    <li key={index}>- {diff}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='column'>
                    <p className='subtitle'><strong>In Nginx Not In Database:</strong></p>
                    <br></br>
                    <ul>
                            {props.diffs && props.diffs.missing_from_db && props.diffs.missing_from_db.map((diff, index) => {
                                return (
                                    <li key={index}>- {diff}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={(e) => {
                e.preventDefault();
                props.setActive(false);
            }}></button>
        </div>
    )
}

const Sync = (props) => {
    const [resolveActive, setResolveActive] = useState(false);
    const [down, setDown] = useState(null);
    const [diffs, setDiffs] = useState(null);

    async function syncCall(){
        return fetch('http://localhost:3090/api/configs/sync')
        .then(async (data) => {
            if (data.ok) {
                data = await data.json()
                setDown(false);
                return data;
            } else {
                setDown(true);
                return null;
            }
        })
        .then((responseJson)=>{return responseJson})
        .catch(error => {
            console.error(error)
            setDown(true);
        });
    }

    async function doSync() {
        const data = await syncCall();

        if(data.diffs){
            setDiffs(data.details)
            setResolveActive(true);
        }

        console.log(data)
    }

    return(
        <div>
            <SyncResolveModal diffs={diffs} active={resolveActive} setActive={setResolveActive} />
            <a href="#sync" onClick={(e) => {
                e.preventDefault();
                doSync();
            }}>
                { down && <Notification>Sync API call failed</Notification>}
                <IconText icon={<FaSync/>}>Sync</IconText>
            </a>
        </div>
    )

}

const ConfigToolbar = (props) => {

    return (
        <div className='level'>
            <div className='level-left'>
                <div className='level-item' style={{borderRight: "solid", paddingRight: "10px"}}>
                    <Sync/>
                </div>
                <div className='level-item' style={{borderRight: "solid", paddingRight: "10px"}}>
                    <a href="#verify" onClick={(e) => {
                        e.preventDefault();
                    }}>
                        <IconText icon={<FaCheck/>}>Verify</IconText>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ConfigToolbar;