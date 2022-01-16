import React from "react";
import PageNotFoundImage from '../../config/images/PageNotFound.jpg'
export default function PageNotFound(props) { 
    return (
        <div style={{display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <div style= {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{width: '200px', height: '300px', margin: '50px'}} src={PageNotFoundImage}/>
                <div>
                    <p style = {{fontSize: '60px', fontWeight: '700'}}>OOPS!</p>
                    <p style = {{fontSize: '60px', fontWeight: '700'}}>PAGE NOT FOUND</p>
                </div>
            </div>
        </div>
    );
}