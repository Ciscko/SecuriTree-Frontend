import React, { createRef, useEffect, useState } from 'react';
import Nav from './Nav';
import Preloader from './Preloader';
import { useNavigate } from "react-router-dom";
import constants from './constants';
import M from 'materialize-css'

const Dataupload = () => {
    const [title, setTitle] = useState("Upload Data");
    const [submitting, setSubmitting] = useState(false)
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Select a json file')
    let nav = useNavigate();
    let tabRef = createRef()
    let url = constants.base_url + 'upload/'; 
    var instance = {}

    useEffect(() => {
        instance = M.Tabs.init(tabRef.current);
        return () => {}
    }, []);


    const uploadData = (e, mode) => {
        e.preventDefault()
        if (file != '') {
            setSubmitting(true);
            if(filename.split(".")[1] == 'json'){
                let formdata = new FormData();
                formdata.append('datafile', file);
                if(mode == 'users'){
                    url = constants.base_url + 'upload_users/';
                }else{
                     url = constants.base_url + 'upload/';
                }
                let token = JSON.parse(localStorage.getItem('tokens'))?.access_token
                fetch(url, {
                    method: 'POST',
                    body: formdata,
                    headers: {'Authorization' : token}
                }).then(res => res.json()).then(res => {
                    setSubmitting(false)
                    console.log(res)
                    if(res.status){
                        nav('/upload');
                        M.toast({html: res.status, classes:'green'});
                    }else{
                        M.toast({html: 'Something went wrong!', classes:'red'});
                        window.location.href = constants.url+'upload';
                    }
                }).catch(err => {
                    console.log(err);
                    setSubmitting(false);
                    M.toast({html: 'Something went wrong!', classes:'red'});
                })
            }else{
                M.toast({html: 'File must be json format!', classes:'red'});
            }
        }else{
            M.toast({html: 'Please select a file!', classes:'green'});
        }
    }

    const fileChange = (e) => {
        if(e.target.files[0].name.split(".")[1] == 'json'){
            setFilename(e.target.files[0].name)
            setFile(e.target.files[0]);
        }else{
                M.toast({html: 'File must be json format!', classes:'red'});
            }
    }

    return (
        <div className='home'>
            <Nav title={title} />
            <div className='center'>
            <div className="row">
                <div className="col s12">
                <ul className="tabs tabs-fixed-width tab-demo z-depth-1" ref={tabRef}>
                    <li className="tab col s3"><a className="active" data-testid="system-title" href="#sys">SYSTEM DATA</a></li>
                    <li className="tab col s3"><a href="#users" data-testid="users-title">USERS DATA</a></li>
                </ul>
                </div>
                <div id="sys" className="col s12">
                    <br></br>
                {
                    submitting ?
                        <Preloader message="Uploading and loading to database..." />
                        :
                        <div className='container'>
                            <div className='row'>
                                <div className='col m6 l6 s10 offset-m3 offset-l3 offset-s1 card-panel hoverable'><br></br>
                                    <form>
                                        <br></br>
                                        <div className='container center'>
                                        <h6>File Input</h6>
                                            <div className="">
                                                <div style={{border:'2px dotted purple', padding:'10px', borderRadius:'4px'}} className="">
                                                    <input type="file" data-testid='sysinput' name="systemdatafile" onChange={(e) => fileChange(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <button className='btn purple' data-testid='sysbtn' onClick={(e) => uploadData(e, 'systemdata')}>Upload</button>
                                    </form>
                                    <br></br><br></br>
                                </div>
                            </div>

                        </div>

                }
                </div>
                <div id="users" className="col s12">
                    <br></br>
                {
                    submitting ?
                        <Preloader message="Uploading and loading to database..." />
                        :
                        <div className='container'>
                            <div className='row'>
                                <div className='col m6 l6 s10 offset-m3 offset-l3 offset-s1 card-panel hoverable'><br></br>
                                    <form>
                                        <br></br>
                                        <div className='container center'>
                                        <h6>File Input</h6>
                                            <div className="">
                                                <div style={{border:'2px dotted blue', padding:'10px', borderRadius:'4px'}} className="">
                                                    <input type="file" data-testid='usersinput' name="usersdatafile" onChange={(e) => fileChange(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <button className='btn purple' data-testid='usersbtn' onClick={(e) => uploadData(e, 'users')}>Upload</button>
                                    </form>
                                    <br></br><br></br>
                                </div>
                            </div>

                        </div>

                }
                </div>
            </div>
               
            </div>
        </div>
    );
}

export default Dataupload;
