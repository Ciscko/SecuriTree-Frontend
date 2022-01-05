import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import '../App.css';
import Nav from './Nav';

const Home = () => {
    let navObj = useNavigate()
    
    return (
        <div className='home'>
           <Nav title='Security Dashboard'/>
            <div className='row'>
                <div className='col m4 l4 s2'></div>
                <div className="col s8 m4 l4">
                    <div className="card-panel center hoverable">
                        <Link to='/view'>
                            <b className="purple-text">
                                View Security Entity Hierarchy
                            </b>
                        </Link>
                    </div>
                </div>
               
            </div>
            <div className='row'>
                <div className='col m2 l3 s2'></div>
                <div className="col s8 m4 l3">
                    <div className="card-panel center hoverable">
                        <Link to='/upload'>
                            <b className="purple-text">
                                Upload Data
                            </b>
                        </Link>
                    </div>
                </div>
                <div className="col s8 m4 l3 offset-s2">
                    <div className="card-panel center hoverable">
                        <Link to='/manage'>
                            <b className="purple-text">
                                Manage Doors
                            </b>
                        </Link>
                    </div>
                </div>
               
            </div>
            <div className='row'>
               
                <div className="col s8 m4 l4 offset-l4 offset-m4 offset-s2">
                    <div className="card-panel hoverable center">
                    <a href='#' onClick={() => { localStorage.clear(); navObj('/login')}}>
                        <b className="red-text">
                            Logout
                        </b>
                    </a>
                    </div>
                </div>
            </div>
            <div className='row'>
              
            </div>
            
        </div>
    );
}

export default Home;
