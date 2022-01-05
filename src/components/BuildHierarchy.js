import React from 'react';

const Buildhierarchy = ({name, child_areas, child_area_ids,doors, access_rules}) => {
    //console.log('PROPS',name, child_areas, child_area_ids,doors, access_rules)
    //const  = props.areas
    //console.log('PROPS',name, child_areas, child_area_ids,doors, access_rules)
    return (
        name && access_rules && doors ?
        <div key={name} style={{paddingLeft:'7%'}}>
                    <details key={`${name}-block`}>
                        <summary key={`${name}-title`} className='grey-text'><b>{name}</b></summary>
                        <div key={`${name}_ad_section`} style={{paddingLeft:'10%'}} >
                            <h6 key={`${name}-acs`} className='grey-text'><b>Access Rules</b></h6>
                                {access_rules.map((rule, i) => (<>{rule}, </>))}
                            <h6 key={`${name}-doors`} className='grey-text'><b>Doors</b></h6>
                                {doors.map((door, i) => (<h6 key={`${door}-${i}`}>{door.name} - {door.status == 'open' ? <b className='red-text'>UNLOCKED</b> : <b className='green-text'>LOCKED</b> }<br></br> </h6>))}
                        </div>
                    </details>
                    <div key={`${name}-children`} style={{paddingLeft:'3%'}}>
                        {
                            child_area_ids.length > 0 && child_areas.map(child => (<Buildhierarchy key={child.name} {...child} />))   
                        }
                    </div>
            
        </div>
        :
        <p> The provided area object does not have the required: name or access_rules or doors </p>
    );
}

export default Buildhierarchy;
