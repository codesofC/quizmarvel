import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const ForgetPassword = () => {

    const [email, setEmail] = useState(''),
        [success, setSuccess] = useState(null),
        [error, setError] = useState(null),
        history = useNavigate(),
        firebase = useContext(FirebaseContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.resetPassword(email)
        .then(userCredential => {
            setError(null);
            setSuccess(`Un message vous a été envoyé par email (${email}) pour modifier votre mot de passe`);
            setTimeout(() => {
                history('/login');
            }, 5000)
        }).catch(error => {
            setError(error);
            setEmail('');
        });
    }

    const displayButton = email ? <button>Valider</button> : <button disabled>Valider</button>;

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftForget'>
            </div>
            <div className='formBoxRight'>
              <div className='formContent'>
                <form onSubmit={handleSubmit}>
                    {success && <span style={{
                        border: '1px solid green', 
                        background: 'green', 
                        color: '#fff'
                        }
                        }>
                        {success}
                    </span>}
                    {error && <span>{error.message}</span>}
                  <h2>Changez mot de passe</h2>
                  
                  <div className='inputBox'>
                    <input type='email' id='email' required autoComplete='off' value={email} onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor='email'>Email</label>
                  </div>
                  {displayButton}
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword;