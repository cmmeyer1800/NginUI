import Status from "./Status"

const Dashboard = (props) => {
    return (
        <div>
            <div className="box"> <p className="has-text-centered title">NginUI Dashboard</p> </div>
            <div className="box">
            <Status />
            </div>
        </div>
    )
}

export default Dashboard;