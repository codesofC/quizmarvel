import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const Login = () => {

  const data = {
    email: '',
    password: ''
  }

  const [login, setLogin] = useState(data);
  const [error, setError] = useState('');
  const firebase = useContext(FirebaseContext);
  const history = useNavigate();

  const handleChange = e => {
    setLogin({...login, [e.target.id]:e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    firebase.signInUser(login.email, login.password)
    .then(userCredential => {
        setLogin({...data});
        history('/welcome');
    }).catch(error => {
      setError(error);
      setLogin({...data});
    });
  }

  const logiqueButton = login.email && login.password.length > 5 ? <button>Valider</button> : <button disabled>Valider</button>
  const errorMessage = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftLogin'>
            </div>
            <div className='formBoxRight'>
              <div className='formContent'>
                <form onSubmit={handleSubmit}>
                  {errorMessage}
                  <h2>Connexion</h2>
                  
                  <div className='inputBox'>
                    <input type='email' id='email' required autoComplete='off' value={login.email} onChange={handleChange} />
                    <label htmlFor='email'>Email</label>
                  </div>
                  <div className='inputBox'>
                    <input type='password' id='password' required autoComplete='off' value={login.password} onChange={handleChange} />
                    <label htmlFor='password'>Mot de passe</label>
                  </div>
                
                  {logiqueButton}
                </form>
                <div className='linkContainer'>
                  <Link className='simpleLink' to='/forgetpassword'>Mot de passe oublié?</Link><br />
                  <Link className='simpleLink' to='/signup'>Inscrivez-vous</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login;