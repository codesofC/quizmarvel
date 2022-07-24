import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import { getDoc } from 'firebase/firestore';
import Logout from '../Logout';
import Quiz from '../Quiz';
import Loader from '../Loader';

const Welcome = () => {

  const [userSession, setUserSession] = useState(null),
        [userData, setUserData] = useState({}),
      firebase = useContext(FirebaseContext),
      history = useNavigate();

  useEffect(()=>{
      //Verification de connexion
      let list = firebase.auth.onAuthStateChanged(user => {
        user ? setUserSession(user) : history('/');
      });

     if(userSession !== null){
        getDoc(firebase.user(userSession.uid))
        .then(doc => {
          if(doc.exists()){
            setUserData(doc.data())
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
      

    return () => {
      list();
    }
  }, [userSession]);


  return userSession === null ? (
    <Loader 
        msg={`Loading...`} 
        style={{textAlign: 'center', color: '#fff'}}
      />
  ) : (
    <div className='quiz-bg'>
        <div className='container'>
          <Logout />
          <Quiz pseudo={userData.pseudo} />
        </div>
    </div>
  );

}

export default Welcome;