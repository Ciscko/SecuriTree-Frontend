import React from 'react';
const Preloader = (props) =>{
    const [ msg, setMsg ]  = React.useState('Processing request...')
    const [loaded, setLoaded] = React.useState(false)
    let timer;
    React.useEffect(() => {
        timer = setTimeout(() => {
           setMsg(props.message)
           setLoaded(true)
    }, 2000)
    return () => {
        clearTimeout(timer)
    }
    }, [])
    
    return(
        <div className='container center' style={{ 'paddingTop': '5%' , 'paddingBottom': '5%'}}>
            <h5>
                {
                msg
                }
            </h5><br></br>
            {
                true &&
                <>
                <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
            </>
            }
        </div>
    );
} 
export default Preloader;