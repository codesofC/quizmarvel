import React, {useRef, useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {

    const [btn, setBtn] = useState(false);
    const refImg = useRef(null);
    
    useEffect(()=>{
        setTimeout(()=>{
            refImg.current.classList.remove("startingImg");
            setBtn(true);
        }, 2000);
    }, []);

    const handleWolverineLeft = () => {
        refImg.current.classList.add("leftImg");
    }
    const handleWolverineRight = () => {
        refImg.current.classList.add("rightImg");
    }
    const clear = () =>{
        if(refImg.current.classList.contains("leftImg")){
            refImg.current.classList.remove("leftImg");
        }else if(refImg.current.classList.contains("rightImg")){
            refImg.current.classList.remove("rightImg");
        }
    }

    const displayBtn = btn && (
        <Fragment>
            <div className='leftBox'>
                <Link to='/signup' className='btn-welcome' onMouseOver={handleWolverineLeft} onMouseOut={clear}>Inscription</Link>
            </div>
            <div className='rightBox'>
                <Link to='login' className='btn-welcome' onMouseOver={handleWolverineRight} onMouseOut={clear}>Connexion</Link>
            </div>
        </Fragment>
    )

  return (
     <main ref={refImg} className='welcomePage startingImg'>
        {displayBtn}
     </main>
  )
}

export default Landing;