import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import ReactTooltip from 'react-tooltip';

const Logout = () => {

    const [checked, setChecked] = useState(false),
        firebase = useContext(FirebaseContext),
        history = useNavigate();

    useEffect(()=>{
        if(checked){
            
            firebase.signOutUser()
            .then(userCredential => {
                history('/');
            })
        }
    }, [checked, firebase]);

  return (
    <div className='logoutContainer'>
        
        <label className='switch'>
            <input type='checkbox' checked={checked} onChange={e => setChecked(e.target.checked)} />
            <span className='slider round' data-tip="Déconnexion"></span>
        </label>
        <ReactTooltip place='left' effect='solid' />
    </div>
  );
}

export default Logout;