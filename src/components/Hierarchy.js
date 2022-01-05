import React, { useEffect, useState } from 'react';
import '../App.css';
import Buildhierarchy from './BuildHierarchy';
import Nav from './Nav';
import Preloader from './Preloader';
import constants from './constants';

const Hierarchy = () => {
    const url = constants.base_url;
    const [areas, setAreas ] = useState({});
    const [ loading, setLoading ] = useState(false)
    let token = JSON.parse(localStorage.getItem('tokens'))?.access_token
    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers: {'Authorization' : token, 'Content-type' : 'application/json'}
        }).then(res => res.json()).then(res => {
            if(res.data[0].data){
                setAreas({...res.data[0].data})
               //console.log(res.data[0].data)
               setLoading(false)
            }else{
                //window.location.href = constants.url+'view'
                setLoading(false)
            }
            
         }).catch(err =>{ setLoading(false);console.log(err)})
         return () => {}
    },[]);
    return (
        <div  className='home'>
            <Nav title='View Hierarchy'/>
            {
                loading ?
                        <Preloader message="Loading hierarchy..." />
                :
                areas.name ?
                <div className='container' style={{paddingLeft:'3%', overflowX:'scroll', paddingBottom:'5%'}}>
                    { areas.id &&
                             <Buildhierarchy key={areas.id} {...areas} />
                    }
                </div>
                :
                <div className="center container">
                    <div className="card row center">
                    <br></br><br></br>
                        <div className='row center'>
                        No data available.
                        </div>
                        <br></br><br></br>
                    </div>
                </div>
            }
           
        </div>
    );
}

export default Hierarchy;
