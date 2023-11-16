import { useEffect, useState } from "react";
import { FaPlusSquare } from 'react-icons/fa';

import { Column, Columns } from "../components/Columns";
import Notification from "../components/Notification";
import { IconText } from "../components/Icons";
import ConfigToolbar from "./ConfigToolbar";


const AddConfigModal = (props) => {

    const [name, setName] = useState('');

    const createCall = (nameParam) => {
        fetch('http://localhost:3090/api/configs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameParam
            })
        })
        .then(async response => {
            const data = await response.json();
            if(!response.ok) {
                console.error("Request Error: ", data.message);
            }
        })
        .catch(error => {
            console.error(error)
        });
    }

    return (
        <div className={`modal ${props.active ? 'is-active':''}`}>
            <div className="modal-background"></div>
            <div className="modal-content box">
                <p className="subtitle has-text-centered"><strong>Create New Configuration</strong></p>
                <hr></hr>
                <div className="field has-addons">
                    <p className="control is-expanded">
                        <input value={name} onChange={(e) => {
                            e.preventDefault();
                            setName(e.target.value);
                        }} className="input" type="text" placeholder="Config Name"></input>
                    </p>
                    <p className="control">
                        <a className="button is-static">
                        .conf
                        </a>
                    </p>
                </div>
                <button className="button is-success is-fullwidth" onClick={(e) => {
                    e.preventDefault();
                    createCall(name);
                    props.setActive(false);
                    setTimeout(() => {
                        props.reload();
                    }, 250 );
                }}>Create</button>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={(e) => {
                e.preventDefault();
                props.setActive(false);
            }}></button>
        </div>
    )
}

const EditConfigModal = (props) => {

    const [config, setConfig] = useState(null);

    const setConfigCall = (configParam) => {
        fetch(`http://localhost:3090/api/configs/${props.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                config: configParam
            })
        })
        .then(async response => {
            const data = await response.json();
            if(!response.ok || data.status !== 'success') {
                console.error("Request Error: ", data.message);
            }
        })
        .catch(error => {
            console.error(error)
        });
    
    }

    useEffect(() => {
        if(props.active) {
            fetch(`http://localhost:3090/api/configs/${props.name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async response => {
                const data = await response.json();
                if(!response.ok || data.status !== 'success') {
                    console.error("Request Error: ", data.message);
                } else {
                    setConfig(data.config)
                }
            })
            .catch(error => {
                console.error(error)
            });
        }
    }, [props.active]);

    return (
        <div className={`modal ${props.active ? 'is-active':''}`}>
            <div className="modal-background"></div>
            <div className="modal-content box">
                <p className="subtitle has-text-centered"><strong>Edit Configuration</strong></p>
                <hr></hr>
                <div className="field">
                    <div className={`control ${config === null ? 'is-loading' : ''}`}>
                        <textarea value={config} className="textarea" placeholder="Config Loading" rows={20} onChange={(e) => {
                            e.preventDefault();
                            setConfig(e.target.value);
                        }}></textarea>
                    </div>
                </div>
                <button className="button is-success mr-4" onClick={(e) => {
                    e.preventDefault();
                    setConfigCall(config);
                    props.setActive(false);
                }}>Save</button>
                <button className="button is-danger" onClick={(e) => {
                    e.preventDefault();
                    props.setActive(false);
                }}>Discard</button>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={(e) => {
                e.preventDefault();
                props.setActive(false);
            }}></button>
        </div>
    )
}

const Config = (props) => {

    const [editActive, setEditActive] = useState(false);

    // TODO: Handle Deletion Failure
    const doDelete = (nameParam) => {
        fetch('http://localhost:3090/api/configs', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameParam
            })
        })
        .then(async response => {
            const data = await response.json();
            if(!response.ok) {
                console.error("Request Error: ", data.message);
            }
        })
        .catch(error => {
            console.error(error)
        });
    }

    return (
        <>
        <EditConfigModal name={props.config.name} active={editActive} setActive={setEditActive}/>
        <a className="box" href={`/${props.config.name}`} onClick={(e) => {
            e.preventDefault();
            setEditActive(true);
        }}>
            <article className="media">
                <div className="media-content">
                    <div className="content">
                        <p className="has-text-centered"><strong>{props.config.name}</strong></p>
                        <p> 
                            <strong>listen:</strong> {props.config.listen} 
                            <br></br>
                            <strong>Server Name:</strong> {props.config.server_name} 
                            <br></br>
                            <strong>Locations:</strong> {props.config.locations !== undefined ? props.config.locations : ''} 
                        </p>
                        <p className="has-text-centered"><small>Last Modified: {props.config.last_modified}</small></p>
                    </div>
                </div>
                <div className="media-right">
                    <button className="delete" onClick={(e) => {
                        e.preventDefault();
                        doDelete(props.config.name);
                        setTimeout(() => {
                            props.reload();
                        }, 250 );
                    }}></button>
                </div>
            </article>
        </a>
        </>
    )
}


const ConfigBody = (props) => {

    const [data, setData] = useState([]);
    const [down, setDown] = useState(null);
    const [addActive, setAddActive] = useState(false);

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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <p className="has-text-centered title">Configurations</p>
            <hr></hr>
            <ConfigToolbar/>
            <br></br>
            { down === null &&
                <></>
            }
            { down && 
            <div>
                <p className="has-text-centered subtitle has-text-danger">Failed To Load Configurations</p>
                <Notification>Backend API call `/api/configs` failed, ensure that the backend is running and is connected</Notification>
            </div>
            }
            { !down &&
            <Columns isMultiline>
                { data.map((item, index) => (
                    <Column key={index} width={3}><Config reload={fetchData} config={item}/></Column>
                ))}
                <Column width={3}><a className="box" href="#new_config" onClick={(e) => {
                    e.preventDefault();
                    setAddActive(true);
                }}>
                    <IconText icon={<FaPlusSquare />}>Add Another Configuration</IconText>
                </a></Column>
            </Columns>
            }
            <AddConfigModal reload={fetchData} active={addActive} setActive={setAddActive}/>
        </div>
    )
}

export default ConfigBody;