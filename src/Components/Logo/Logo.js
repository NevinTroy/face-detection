import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import skull from './icons8-skull-100.png'

const Logo=()=>{
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2">
                <div>
                    <img src={skull} alt="skull" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;