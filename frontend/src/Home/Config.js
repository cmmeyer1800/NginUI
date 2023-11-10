import { useEffect, useState } from "react";

import { Column, Columns } from "../components/Columns";
import Notification from "../components/Notification";

const Config = (props) => {

    const [data, setData] = useState(null);
    const [down, setDown] = useState(null);

    useEffect(() => {
        // Fetch function
        const fetchData = () => {
            fetch('http://localhost:3090/api/nginx_status')
            .then(response => response.json())
            .then(json => {
                setData(json)
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
            { !down && 
            <div>
                <p className="has-text-centered subtitle has-text-danger">Failed To Load Configurations</p>
                <Notification message={"Backend API call `/api/configs` failed, ensure that the backend is running and is connected"}/>
            </div>
            }
            { down &&
            <Columns isMultiline>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
            </Columns>
            }
        </div>
    )
}

export default Config;