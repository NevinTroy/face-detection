import React from 'react';
import './ImageForm.css'

const ImageForm=(props)=>{
    const {onInputChange,onSubmitChange}=props;
    return(
        <div>
            <p className='center f3'>This will detect the the faces in your pictures. Give it a try</p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input type="text" className='f4 pa2 w-70' onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmitChange}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageForm;