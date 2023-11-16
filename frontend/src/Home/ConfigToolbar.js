import { useEffect, useState } from 'react';
 
import { FaCheck, FaArrowRight, FaBan } from "react-icons/fa";

import { IconText } from "../components/Icons";


const VerifyModal = (props) => {

    const [output, setOutput] = useState(null);
    const [down, setDown] = useState(false);

    useEffect(() => {
        if(props.active) {
            fetch('http://localhost:3090/api/configs/verify', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async response => {
                const data = await response.json();
                if(!response.ok || data.status !== 'success') {
                    console.error("Request Error: ", data.message);
                    setDown(true);
                }
                console.log(data);
                setOutput(data);
                setDown(false);
            })
            .catch(error => {
                console.error(error)
                setDown(true);
            });
        }
    }, [props.active]);

    return (
        <div className={`modal ${props.active ? 'is-active':''}`}>
            <div className="modal-background"></div>
            <div className="modal-content box">
                <p className="subtitle has-text-centered"><strong>Verification Output: </strong>
                    { down && <strong className='has-text-danger'>API Fail</strong>}
                    { !down && output !== null && <>
                        { !down && output.result && <strong className='has-text-success'>Good</strong>}
                        { !down && !output.result && <strong className='has-text-danger'>Bad</strong>}
                        </>
                    }
                    { !down && output === null && <strong>Loading...</strong>}
                </p>
                <hr></hr>
                { props.active &&
                <div>
                    { output !== null && !down &&
                    <div className='box has-background-dark'>
                        <p className='has-text-light'>$ nginx -t</p>
                        <div className='has-text-light'>{output.details.map((line, index) => {
                            return (
                                <p key={index}>
                                    {line}
                                </p>
                            )
                        })
                        }</div>
                    </div> }
                    { output === null && <div>Loading...</div>}
                </div>
                }   
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={(e) => {
                e.preventDefault();
                props.setActive(false);
            }}></button>
        </div>
    )
}

const VerifyConfig = (props) => {

    const [modalActive, setModalActive] = useState(false);

    return (
        <div>
            <VerifyModal active={modalActive} setActive={setModalActive}/>
            <a href="#verify" onClick={(e) => {
                e.preventDefault();
                setModalActive(true);
            }}>
                <IconText icon={<FaCheck/>}>Verify</IconText>
            </a>
        </div>
    )
}


const ConfigToolbar = (props) => {

    return (
        <div className='level'>
            <div className='level-left'>
                <div className='level-item' style={{borderRight: "solid", paddingRight: "10px"}}>
                    <VerifyConfig/>
                </div>
                <div className='level-item' style={{borderRight: "solid", paddingRight: "10px"}}>
                    <a href="#Apply" onClick={(e) => {
                        e.preventDefault();
                    }}>
                        <IconText icon={<FaArrowRight/>}>Apply</IconText>
                    </a>
                </div>
                <div className='level-item' style={{borderRight: "solid", paddingRight: "10px"}}>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                    }}>
                        <IconText icon={<FaBan/>}>Cancel</IconText>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ConfigToolbar;