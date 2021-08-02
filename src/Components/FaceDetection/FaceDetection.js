import React from 'react';

const FaceDetection=({imageURL})=>{
    return(
        <div className='center ma'>
            <img alt='faces' src={imageURL} width='500px' height='auto' />
        </div>
    );
};

export default FaceDetection;