import React, { useEffect, useState, createRef } from 'react';
import '../App.css';
import ActionDataTable from './ActionDataTable';
import Nav from './Nav';
import constants from './constants';
import M from 'materialize-css'
import Preloader from './Preloader';
import { useNavigate } from 'react-router-dom';

const Manage = () => {
    const [time, setTime] = useState('')
    const [submitting, setSubmiting] = useState(false)
   
    const [door, setDoor] = useState([])
    let modalRef = createRef()
    let url = constants.base_url + 'doors/'
    const [ status, setStatus ] = useState(true)
    const paginatedColumns = [
        { key: 'id', value: 'Door_ID' },
        { key: 'name', value: 'Name' },
        { key: 'status', value: 'Status' },
        { key: 'parent_area', value: 'Parent Area ID' },
    ]
    useEffect(() => {
        M.Modal.init(modalRef.current)

    }, [])
    let navObj = useNavigate()

    const edit = (values) => {
        setStatus(values[2] == 'open' ? true : false)
        setDoor([...values])
       let i =  M.Modal.init(modalRef.current, { opacity: 0.95, startingTop :'10%', dismissible:false})
       i = M.Modal.getInstance(modalRef.current)
       i.open()
    }

    const toggleDoor = (e) => {
        setSubmiting(true)
        let url = constants.base_url+'lock_door/'
        let token = JSON.parse(localStorage.getItem('tokens'))?.access_token
        fetch(url, {
            method: 'POST',
            headers: {'Authorization' : token, 'Content-type' : 'application/json'},
            body : JSON.stringify({state : status ? 'closed' :'open', door_id:door[0] })
        }).then(res => res.json()).then(res => {
            if(res.status){
                setStatus(!status)
                M.toast({html: 'Successfully set Door-Status!', classes:'green'});
            setSubmiting(false)
            }else{
                //M.toast({html: 'You are probably not logged in. Please do.', classes:'red'});
                //window.location.href = constants.url+'manage'
            }
            
        }).catch(err => {
            setSubmiting(false)
            window.location.href = constants.url+'manage'
            M.toast({html: 'Something went wrong!', classes:'red'});
            console.log(err)
        })
    }

    return (
        <div className='home'>
            <Nav title='Manage Doors' />
            <>
            {
                   <>
                   <div className='center' style={{paddingRight:'5%', paddingLeft:'5%'}}>
                           <ActionDataTable  columns={paginatedColumns} editProp={edit} editMode={status} url={url}/>
                   </div>
                   <div id="modal1" data-testid="modal1" ref={modalRef} className="modal">
                       {
                           
                        <div className="modal-content center">
                            {
                                submitting ?
                            <>
                                <Preloader message="Set door status and updating hierarchy..."/>
                                <br></br><br></br>
                            </>
                           :
                           <>
                            <h4><b>{status ? 'UNLOCKED' : 'LOCKED' }</b></h4>
                           <p>{door[0]}</p>
                           <p><b>{door[1]}</b></p>
                           <div className="switch">
                               <label>
                               LOCK
                               <input type="checkbox" data-testid="lock-btn" checked={status} onChange={(e) => toggleDoor(e)}/>
                               <span className="lever"></span>
                               UNLOCK
                               </label>
                           </div>
                           <br></br>
                           <hr></hr>
                           <a href="#!" className="modal-close center waves-effect waves-red red white-text btn-flat">Close</a>
                           
                           </>
                      
                            }
                           </div>
                       }
                       
                   </div>
                   </>
            }
                    
            </>
           
        </div>
    );
}

const Drop = () => {
    return(
        <ul id='dropdown1' className='dropdown-content'>
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li><a href="#!">three</a></li>
        </ul>
    );
}
export default Manage;
