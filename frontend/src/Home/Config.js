import { Column, Columns } from "../components/Columns";

const Config = (props) => {
    return (
        <div>
            <p className="has-text-centered title">Configurations</p>
            <Columns isMultiline>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
                <Column width={3}><div className="box">TEST</div></Column>
            </Columns>
        </div>
    )
}

export default Config;