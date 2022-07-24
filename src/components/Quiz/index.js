import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuizMarvel } from '../QuizQuestions';
import QuizOver from './QuizOver';
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import { FaChevronRight } from 'react-icons/fa';
 


toast.configure();

class Quiz extends React.Component{

  constructor(props) {
    super(props);

    this.initial = {
      levelsName: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestion: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisable: true,
      userAnswer: null,
      score: 0,
      displayNotifWelcome: false,
      overGame: false,
      percent: null
    }
  
    this.state = this.initial;
    this.quizRef = React.createRef();
  }


  loadingQuestions= levelName => {
    const levelQuestions = QuizMarvel[0].quizz[levelName];
    this.quizRef.current = levelQuestions;
    

    if(levelQuestions.length >= this.state.maxQuestion){
      const newArray = levelQuestions.map(({answer, ...rest}) => rest );
      this.setState({
        storedQuestions: newArray
      });
    }
  }

  showNotifWelcome = pseudo => {

    if(!this.state.displayNotifWelcome){

      this.setState({
        displayNotifWelcome: true
      });

      toast.info(`Welcome ${pseudo}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    }
  }

  componentDidMount() { 
    this.loadingQuestions(this.state.levelsName[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) { 
    if(prevState.storedQuestions !== this.state.storedQuestions && this.state.storedQuestions.length){
        this.setState({
          question: this.state.storedQuestions[this.state.idQuestion].question,
          options: this.state.storedQuestions[this.state.idQuestion].options
        });
    }

    if(prevState.idQuestion !== this.state.idQuestion && this.state.storedQuestions.length){
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisable: true
      });
    }
    if(this.props.pseudo !== prevProps.pseudo){
      this.showNotifWelcome(this.props.pseudo);
    }
  } 

  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestion - 1){
      this.gameOver();
      
    }else{
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }));
    }

    //Add Compteur Bonne Reponse
    if(this.quizRef.current[this.state.idQuestion].answer === this.state.userAnswer){
      this.setState(prevState => ({
        score: prevState.score + 1
      }));
      toast.success('Bonne reponse!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    }else{
      toast.error('Mauvaise reponse!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    }
  }

  submitAnswer = answer => {
    this.setState({
      userAnswer: answer,
      btnDisable: false
    })
  }

  getPourcentage = (maxQuestion, score) => (score * 100) / maxQuestion;

  gameOver = () => {
    const pcent = this.getPourcentage(this.state.maxQuestion, this.state.score);

    if(pcent >= 50){
      this.setState({
        overGame: true,
        quizLevel: this.state.quizLevel + 1,
        percent: pcent
      });
    }else{
      this.setState({
        overGame: true,
        percent: pcent
      });
    }
    
  }

  nextLevelQuestions = param => {
    this.setState({...this.initial, quizLevel: param});
    this.loadingQuestions(this.state.levelsName[param]);
  }

  render(){

    const displayOptions = this.state.options.map((option, index) => {
      return(
        <p key={index} 
          className={`answerOptions ${this.state.userAnswer === option ? 'selected' : null}`}
          onClick={()=> this.submitAnswer(option)}
        >
          <FaChevronRight /> {option}
        </p>
      )
    });

    return this.state.overGame ? (
      <QuizOver 
        ref={this.quizRef} 
        maxQuestion={this.state.maxQuestion} 
        score={this.state.score} 
        quizLevel={this.state.quizLevel}
        levelsName={this.state.levelsName}
        percent={this.state.percent}
        nextLevel={this.nextLevelQuestions}
      />
    ) : (
      <>
          <Levels levelsName={this.state.levelsName} quizLevel={this.state.quizLevel} />
          <ProgressBar question={this.state.idQuestion + 1} maxQuestions={this.state.maxQuestion} />
          <h2>{this.state.question}</h2>
          {displayOptions}
          <button 
            disabled={this.state.btnDisable} 
            className='btnSubmit'
            onClick={this.nextQuestion}
            >
              {this.state.idQuestion < this.state.maxQuestion - 1 ? "Suivant" : "Terminer"}
            </button>
      </>
    )
  }
}

export default Quiz;