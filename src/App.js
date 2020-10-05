import React, { Component } from 'react';
import './App.css';
import Answers from './Answers'
import Result from './Result'

const API = 'https://restcountries.eu/rest/v2/all'

class App extends Component {

  state = {
    chooseId: '',
    countries: [],
    result: 0,
    answers:[],
    correct_answer_index: '',
    answered: false,
    correctCountry: '',
    correctCapital: '',
    tryAgain: false,
    wasCorrect: true
  }

    componentDidMount() {
    fetch(API)
    .then((response) => response.json())
    .then(data => {
      const correct_answer_index = Math.floor(Math.random()*4);
      let n = 250, answer=[],a,b, id=0;
      for (let i=0; i<4; i++) {
        let r = Math.floor(Math.random()*n);
        answer.push({name: data[r].capital, id, style:""});
        a = data[r]
        b = data[n - 1];
        data[r] = b 
        data[n-1] = a
        n--;
        id++;
      }
       const countries = data;
       const correctCapital = answer[correct_answer_index].name;
       const correctCountry = countries.filter( item => item.capital === correctCapital)
    
        this.setState({ 
          countries: data,
          answers: answer,
          correct_answer_index,
          correctCountry: correctCountry[0].name,
          correctCapital
        });
    });
  }

  handleButton = param => (e) => {
    let wasCorrect;
    let answers = [...this.state.answers];
    const index = answers.findIndex(answer => answer.id === param);
    if(e.target.value === this.state.correctCapital){
      answers[index].style = "correct_answer"
      wasCorrect = true
    } else {
      answers[index].style = "uncorrect_answer"
      wasCorrect = false 
    }
    this.setState({
      answers,
      answered: true,
      result: this.state.result + 1,
      wasCorrect
    })
  }

  handleNextClick = () => {
    let tryAgain;
    const {countries} = this.state;
    const correct_answer_index = Math.floor(Math.random()*4);
      let n = 250, answer=[],a,b, id=0, style="";
      for (let i=0; i<4; i++) {
        let r = Math.floor(Math.random()*n);
        answer.push({name: countries[r].capital, id, style});
        a = countries[r]
        b = countries[n - 1];
        countries[r] = b 
        countries[n-1] = a
        n--;
        id++;
      }
    const correctCapital = answer[correct_answer_index].name;
    const correctCountry = countries.filter( item => item.capital === correctCapital)
    
    if(this.state.wasCorrect){
      tryAgain = false;
    }
    else{
      tryAgain = true;
    }

    this.setState({ 
      countries,
      answers: answer,
      correct_answer_index,
      correctCountry: correctCountry[0].name,
      correctCapital,
      answered: !this.state.answered,
      tryAgain,
      wasCorrect: true
    });
    
  }

  handleTryAgainClick = () => {
    this.setState({
      tryAgain: false,
      result: 0
    })
  }
  render() {
    const answerList = this.state.answers.map(answer => 
      <li key={answer.id}>
        <button className={answer.style} value={answer.name} onClick={this.handleButton(answer.id)} disabled={this.state.answered}>{answer.name}</button> 
      </li>)
  
    return (
      <div className="container">
        <h1>country quiz</h1>
        <div className="answer_box">
          {this.state.tryAgain ?
            <Result result={this.state.result} click={this.handleTryAgainClick}/>
            : 
            <Answers 
              answerList={answerList} 
              answered={this.state.answered} 
              click={this.handleNextClick} 
              correctCountry={this.state.correctCountry}
            />
          }
          
        </div>
      </div>
    );
  }
}

export default App;
