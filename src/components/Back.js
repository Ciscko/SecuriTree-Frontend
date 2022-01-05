import React from 'react';
import img from '../back.png'
const Back = (props) => {
    return (<div style={{ cursor: 'pointer' }}>
        {
            props.back ?
                <div className='' onClick={() => global.history.back()}>
                    <i role="nav" className="small material-icons">arrow_back</i>
                </div>
                :
                <div className='' onClick={() => global.history.forward()}>
                    <i role="nav" className="small material-icons">arrow_forward</i>
                </div>
        }
    </div>
    );
}

export default Back;
