import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import userphoto from '../user.jpg'
import Back from './Back';
import { useNavigate } from 'react-router-dom';
import constants from './constants';

const Nav = (props) => {
    let navObj = useNavigate()
    const [ user, setUser] = useState({id:'1', email:'jdandturk@gmail.com', username:'jdandturk'});
    useEffect(() => {
        let url = constants.base_url+'user/';
        let token = JSON.parse(localStorage.getItem('tokens'))?.access_token
        //console.log('token', token);
            fetch(url, {
                method: 'GET',
                headers: {'Authorization' : token, 'Content-type' : 'application/json'}
            }).then(res => res.json()).then(res => {
                //console.log(res)
                if(res.user.id){
                    setUser({...user, id:res.user?.id, email:res.user?.email, username:res.user?.username})
                }else{
                    navObj('/login')
                }
            }).catch( err => {
                //console.log(err)
                navObj('/login')
            });
            return () => {
                setUser({});
            }
    }, []);

    useEffect(()=>{
        let elems = document.querySelectorAll('.sidenav');
        let instances = M.Sidenav.init(elems, {})
    })
   

    return (
        <>
            <nav>
                <div className="nav-wrapper purple">
                    
                    <Link to="/" className="brand-logo center"><b className='white-text'> Securitree </b></Link>
                    
                    <ul id="nav-mobile" className="left">
                        
                        <li><a href="#" data-target="slide-out"  className="sidenav-trigger"><i className="material-icons">menu</i></a></li>
                        <li className='sidenav-close hide-on-med-and-down'><Link to='/'><b className='white-text'> <i className="small material-icons">home</i></b></Link></li>
                        <a href="#" data-target="slide-out" className="sidenav-trigger hide-on-med-and-down"><i className="small material-icons">menu</i></a>

                    </ul>
                </div>
            </nav>
            <ul id="slide-out" className="sidenav purple">
                <li>
                    <div className="user-view">
                   
                    <img className='center' src={userphoto} className='circle' alt='User-Icon'/>
                    
                    
                    <a href="#name"><span className="white-text name">{user.username}</span></a>
                    <a href="#email"><span className="white-text email">{user.email}</span></a>
                </div>
                <hr></hr>
                </li>
                <li className='sidenav-close'><Link to='/'><b className='white-text' data-testid="nav-dashboard"> - Dashboard</b></Link></li>
                <li className='sidenav-close'><Link to='/upload'><b className='white-text' data-testid="nav-upload"> + Upload Data</b></Link></li>
                <li className='sidenav-close'><Link to='/view'><b className='white-text' data-testid="nav-hierarchy">/- Hierarchy</b></Link></li>
                <li className='sidenav-close'><Link to='/manage'><b className='white-text' data-testid="nav-manage">- Manage Doors</b></Link></li>
                <li className='sidenav-close'><a onClick={() => { localStorage.clear(); navObj('/login')}}><b className='red-text' data-testid="nav-logout"> - Logout</b></a></li>
            </ul>
            <br></br>
            <div className="row">
                <div className='col l1 m1 s1'>
                <Back back={true}/>
                </div>
                <div className='col l10 m10 s9'>
                <div className='hide-on-med-and-up'><br></br></div>
                     <h5 className='center purple-text'>{props.title}</h5><hr></hr>
                </div>
                <div className='col l1 m1 s1'>
                <Back back={false}/>
                </div>
               
            </div>
           
        </>
    );
}

export default Nav;
