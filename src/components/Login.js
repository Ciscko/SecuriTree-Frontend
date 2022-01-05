import React, { useState } from 'react';
import constants from './constants';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css'

const Login = () => {
    const [ password, setPassword ] = useState('');
    const [ username, setUser] = useState('');
    let navObj = useNavigate()
    const submit = (e) => {
        e.preventDefault();
        if(password != '' && username != ''){
                authenticate({username, password}).then(res => {
                    if(res.access){
                        localStorage.setItem('tokens', JSON.stringify({'access_token': 'Bearer '+res.access, 'refresh_token': 'Bearer '+res.refresh }));
                        setPassword('');
                        setUser('');
                        //console.log(localStorage.getItem('tokens'));
                        navObj('/');
                        M.toast({html: 'You are logged in!', classes:'green'});
                    }else{
                        M.toast({html: 'Please check your credentials and retry login.', classes:'red'});
                    }
            }).catch(err => {
                console.log(err)
                M.toast({html: 'Something went wrong!', classes:'red'});
            }
                )

            
        }
    }

    const authenticate = async ({ username, password }) => {
        let formdata = new FormData()
        formdata.append('password', password);
        formdata.append('username', username);
        let res = await fetch(constants.base_url+'token/', {
            method : 'POST',
            body : formdata
        })
        res = await res.json();
        return{ ...res }
    }
    return (
        <div className='container'>
            <div className='row'>
                <div style={{marginTop:'16%'}} className='col m6 l6 s10 offset-m3 offset-l3 offset-s1 card center'>
                    <br></br><br></br>
                    <h5 className='teal-text'>LOGIN</h5>
                    <form>
                        <div className="input-field col s10 offset-s1">
                            <input placeholder='Username' data-testid='username' id="username" min={1} value={username} onChange={(e) => setUser(e.target.value)} type="text" name='username' required className="validate" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input-field col s10 offset-s1">
                            <input placeholder='Password' id="password" data-testid='password' min={1} value={password} onChange={(e) => setPassword(e.target.value) } type="password" name="password" required className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field col s10 offset-s1">
                            <button data-testid="login-btn" className='btn' onClick={(e) => submit(e)}>Login</button>
                        </div>
                        
                    </form>
                    <br></br><br></br> 
                </div>
                <br></br><br></br>
            </div>

        </div>
    );
}

export default Login;
