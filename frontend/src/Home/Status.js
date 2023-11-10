import React, { useState, useEffect } from 'react';

import { Column, Columns } from "../components/Columns";


const StatusItem = (props) => {
    return (
        <Column>
            <div>
                <p className="has-text-centered has-text-weight-bold">{props.title}</p>
                <hr></hr>
                { props.down === null && <p className="has-text-centered">Loading ...</p> }
                { props.down && <p className="has-text-centered"></p> }
                { props.down === false && <p className="has-text-centered title">{props.data[props.statname]}</p>}
            </div>
        </Column>
    )
}


const Status = (props) => {

    const [data, setData] = useState(null);
    // true means yes down, false means not down, null means unknown yet
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
    
        // Call fetch immediately on page load
        fetchData();
    
        // Then call fetch every 5 seconds
        const interval = setInterval(fetchData, 5000);
    
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    var downMsg
    if(down === null) downMsg = <span className='subtitle'>loading...</span>
    else if(down) downMsg = <span className='subtitle has-text-danger'>Down</span>
    else downMsg = <span className='subtitle has-text-success'>Up</span>

    return (
        <div>
            <div className="has-text-centered">
                <span className='subtitle'>Nginx Status: </span>
                {downMsg}
            </div>
            <br></br>
            <Columns>
                <StatusItem down={down} data={data} title={"Active Connections"} statname={"active-connections"}/>
                <StatusItem down={down} data={data} title={"Connections Accepted"} statname={"connections-accepted"}/>
                <StatusItem down={down} data={data} title={"Connections Handled"} statname={"connections-handled"}/>
                <StatusItem down={down} data={data} title={"Requests Handled"} statname={"requests-handled"}/>
                <StatusItem down={down} data={data} title={"Currently Reading"} statname={"curr-reading"}/>
                <StatusItem down={down} data={data} title={"Currently Writing"} statname={"curr-writing"}/>
                <StatusItem down={down} data={data} title={"Currently Waiting"} statname={"curr-waiting"}/>
            </Columns>
        </div>
    )
}

export default Status;