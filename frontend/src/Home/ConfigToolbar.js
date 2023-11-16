import { useState } from 'react';
 
import { FaCheck, FaArrowRight, FaBan } from "react-icons/fa";

import { IconText } from "../components/Icons";
import Notification from '../components/Notification';


const ConfigToolbar = (props) => {

    return (
        <div className='level'>
            <div className='level-left'>
                <div className='level-item' style={{borderRight: "solid", paddingRight: "10px"}}>
                    <a href="#verify" onClick={(e) => {
                        e.preventDefault();
                    }}>
                        <IconText icon={<FaCheck/>}>Verify</IconText>
                    </a>
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