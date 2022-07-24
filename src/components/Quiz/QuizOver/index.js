import React, { useEffect, useState } from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import Loader from '../../Loader';
import Modal from './Modal';
import axios from 'axios';

const QuizOver = React.forwardRef(({maxQuestion, score, quizLevel, 
                                    levelsName, percent, nextLevel}, ref) => {

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
    const hash = '2d546b9833b67f1a21345bc4709ba036';
    
    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [dataCharacter, setDataCharacter] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAsked(ref.current);
        if(localStorage.getItem('marvelStorageDate')){
            checkDate(localStorage.getItem('marvelStorageDate'));
        }
    }, [ref]);

    const checkDate = date => {
        const timeDifference = Date.now() - date;
        const days = timeDifference / (1000 * 3600 * 24);

        if(days >= 15){
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now());
        }
    }

    const displayModal = id => {
        setOpenModal(true);

        if(!localStorage.getItem(id)){

            axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${API_PUBLIC_KEY}&hash=${hash}`)
            .then( response => {
                setDataCharacter(response.data);
                setLoading(false);

                localStorage.setItem(id, JSON.stringify(response.data));

                if(!localStorage.getItem('marvelStorageDate')){
                    localStorage.setItem('marvelStorageDate', Date.now());
                }

            }).catch( err => console.log(err))
        }else{

            setDataCharacter(JSON.parse(localStorage.getItem(id)));
            setLoading(false);

        }
    }

    const closeModal =  () => {
        setOpenModal(false);
        setLoading(true);
    }

    if(percent < 50){
        setTimeout(() => nextLevel(quizLevel), 5000);
    }

    const decision = percent >= 50 ? (

        <div className='stepsBtnContainer'>
            {quizLevel < levelsName.length ? (
                <>
                    <p className='successMsg'>Bravo! Passez au niveau suivant</p>
                    <button 
                        className='btnResult success'
                        onClick={()=>nextLevel(quizLevel)}
                    >Niveau Suivant</button>
                </>
            ) : (
                <>
                    <p className='successMsg'>
                        <GiTrophyCup size='5em' />
                        Bravo! Vous etes un expert
                    </p>
                    <button 
                        className='btnResult gameOver'
                        onClick={()=>nextLevel(0)}
                    >
                        Accueil
                    </button>
                </>
            )}
        </div>

    ) : (
        <div className='stepsBtnContainer'>
            <p className='failureMsg'>Vous avez echoué!</p>
        </div>
        
    );

    const tr = percent >= 50 ? (asked.map((quiz, index) => {
        return (
            <tr key={index}>
                <td>{quiz.question}</td>
                <td>{quiz.answer}</td>
                <td>
                    <button 
                        className='btnInfo'
                        onClick={()=>displayModal(quiz.heroId)}
                    >
                        Infos
                    </button>
                </td>
            </tr>
        )
    })) : (
        <tr>
            <td colSpan='3'>
                <Loader 
                    msg={`Pas de réponses!`} 
                    style={{textAlign: 'center', color: 'red'}}
                />
            </td>
        </tr>
    );
    
    { /* const links = dataCharacter.data.results[0].urls && 
                dataCharacter.data.results[0].urls.map((url, index) => {
       return (<a 
                key={index} 
                href={url.url}
                target='_blank'
                rel='noopener noreferrer'
            >
                {url.type}
            </a>)
    }); */}

    const resultInModal = !loading ? (
        <>
            <div className='modalHeader'>
                <h2>{dataCharacter.data.results[0].name}</h2>
            </div>
            <div className='modalBody'>
                <div className='comicImage'>
                    <img 
                        src={dataCharacter.data.results[0].thumbnail.path+'.'+dataCharacter.data.results[0].thumbnail.extension} 
                        alt={dataCharacter.data.results[0].name}
                    />
                    <p>{dataCharacter.attributionText}</p>
                </div>
                <div className='comicDetails'>
                    <h3>Description</h3>
                    {
                        dataCharacter.data.results[0].description ? (
                          <p> { dataCharacter.data.results[0].description } </p>
                        ) : (
                            <p>Description indisponible</p>
                        )
                    }
                    <h3>Plus d'infos</h3>
                    { /*links*/ }
                </div>
            </div>
            <div className='modalFooter'>
                <button className='modalBtn' onClick={closeModal}>Fermer</button>
            </div>
        </>
    ) : (
        <>
            <div className='modalHeader'>
                <h2>Reponse Marvel...</h2>
            </div>
            <Loader />
        </>
    )

    return (
        <>
            {decision}
            <div className='percentage'>
                <div className='progressPercent'>{`Réussite: ${(score * 100)/maxQuestion}%`}</div>
                <div className='progressPercent'>Note: {`${score}/${maxQuestion}`}</div>
            </div>
            <hr />
            <p>Réponses aux questions posées</p>
            <div className='answerContainer'>
                <table className='answers'>
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tr}
                    </tbody>
                </table>
            </div>

            <Modal openModal={openModal}>
                
                { resultInModal }
            </Modal>
        </>
    )
  });


export default React.memo(QuizOver);