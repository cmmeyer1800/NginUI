import { useEffect, useState } from "react";
import { FaPlusSquare } from 'react-icons/fa';

import { Column, Columns } from "../components/Columns";
import Notification from "../components/Notification";
import { IconText } from "../components/Icons";


const Config = (props) => {
    return (
        <a className="box" href={`/${props.config.name}`}>
            <article className="media">
                <div className="media-content">
                    <div className="content">
                        <p className="has-text-centered"><strong>{props.config.name}</strong></p>
                        <p> 
                            <strong>listen:</strong> {props.config.listen} 
                            <br></br>
                            <strong>Server Name:</strong> {props.config.server_name} 
                            <br></br>
                            <strong>Locations:</strong> {props.config.locations.length} 
                        </p>
                        <p className="has-text-centered"><small>Last Modified: {props.config.last_modified}</small></p>
                    </div>
                </div>
            </article>
        </a>
    )
}


const ConfigBody = (props) => {

    const [data, setData] = useState([]);
    const [down, setDown] = useState(null);

    useEffect(() => {
        // Fetch function
        const fetchData = () => {
            fetch('http://localhost:3090/api/configs')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setData(json.configs);
                setDown(false);
            })
            .catch(error => {
                console.error(error)
                setDown(true);
            });
        }

        fetchData();
    }, []);

    return (
        <div>
            <p className="has-text-centered title">Configurations</p>
            <hr></hr>
            { down === null &&
                <></>
            }
            { down && 
            <div>
                <p className="has-text-centered subtitle has-text-danger">Failed To Load Configurations</p>
                <Notification message={"Backend API call `/api/configs` failed, ensure that the backend is running and is connected"}/>
            </div>
            }
            { !down &&
            <Columns isMultiline>
                { data.map((item, index) => (
                    <Column key={index} width={3}><Config config={item}/></Column>
                ))}
                <Column width={3}><a className="box" href="/new_config">
                    <IconText icon={<FaPlusSquare />}>Add Another Configuration</IconText>
                </a></Column>
            </Columns>
            }
        </div>
    )
}

export default ConfigBody;