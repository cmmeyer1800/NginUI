import { useState } from 'react';
 
import { FaSync, FaCheck } from "react-icons/fa";
import { IconText } from "../components/Icons";
import Notification from '../components/Notification';

const ConfigToolbar = (props) => {
    const [down, setDown] = useState(null);

    async function syncCall(){
        return fetch('http://localhost:3090/api/sync')
        .then(async (data) => {
            if (data.ok) {
                data = await data.json()
                setDown(false);
                return data;
                //Here you have your data...
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
        console.log(data)
    }

    return (
        <div>
            { down && <Notification>Sync API call failed</Notification>}
            <span style={{borderRight: "solid", paddingRight: "10px"}}>
                <a href="#sync" onClick={(e) => {
                    e.preventDefault();
                    doSync();
                }}>
                    <IconText icon={<FaSync/>}>Sync</IconText>
                </a>
            </span>
            <span style={{borderRight: "solid", paddingLeft: "10px", paddingRight: "10px"}}>
                <a href="#sync" onClick={(e) => {
                    e.preventDefault();
                }}>
                    <IconText icon={<FaCheck/>}>Verify</IconText>
                </a>
            </span>
        </div>
    )
}

export default ConfigToolbar;