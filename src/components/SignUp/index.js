import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import { setDoc } from "firebase/firestore";

const SignUp = () => {

  const history = useNavigate();
  
  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [form, setForm] = useState(data);
  const [erreur, setError] = useState('');

  const firebase = useContext(FirebaseContext);

  const handleChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    firebase.signupUser(form.email, form.password)
    .then(authUser => {
      return setDoc(firebase.user(authUser.user.uid), {
        pseudo: form.pseudo,
        email: form.email,
        password: form.password
      });
    })
    .then(() => {
      setForm({...data});
      history('/welcome');
    })
    .catch((error) => {
      setError(error);
      setForm({...data});
    });
  }

  const logiqueButton = form.pseudo && form.email && form.password && form.confirmPassword === form.password ? <button>Valider</button> : <button disabled>Valider</button>;
  const errorMessage = erreur !== '' && <span>{erreur.message}</span>;


  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftSignup'>
            </div>
            <div className='formBoxRight'>
              <div className='formContent'>
                <form onSubmit={handleSubmit}>
                  {errorMessage}
                  <h2>Inscription</h2>
                  <div className='inputBox'>
                    <input type='text' id='pseudo' required autoComplete='off' value={form.pseudo}  onChange={handleChange}/>
                    <label htmlFor='pseudo'>Pseudo</label>
                  </div>
                  <div className='inputBox'>
                    <input type='email' id='email' required autoComplete='off' value={form.email}  onChange={handleChange}/>
                    <label htmlFor='email'>Email</label>
                  </div>
                  <div className='inputBox'>
                    <input type='password' id='password' required autoComplete='off' value={form.password}  onChange={handleChange}/>
                    <label htmlFor='password'>Mot de passe</label>
                  </div>
                  <div className='inputBox'>
                    <input type='password' id='confirmPassword' required autoComplete='off' value={form.confirmPassword}  onChange={handleChange}/>
                    <label htmlFor='confirmPassword'>Confirmation mot de passe</label>
                  </div>
                  {logiqueButton}
                </form>
                <div className='linkContainer'>
                  <Link className='simpleLink' to='/login'>Déja inscrit? Connectez-vous</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp;