import React, { Component } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import ButtonBoard from './Components/ButtonBoard/ButtonBoard';
import Log from './Components/Log/Log';
import AppHeader from './Components/AppHeader/AppHeader';
import Modals from './Components/Modals/Modals';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        finalRound: false,
        winner: ['', 0],
        players: [],
      }
      this.nextPlayer = this.nextPlayer.bind(this);
      this.addRoll = this.addRoll.bind(this);
      this.bankPoints = this.bankPoints.bind(this);
      this.pigOut = this.pigOut.bind(this);
      this.makinBacon = this.makinBacon.bind(this);
      this.updateScoreboard = this.updateScoreboard.bind(this);
      this.logUpdate = this.logUpdate.bind(this);
      this.newPlayerSubmit = this.newPlayerSubmit.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.newGame = this.newGame.bind(this);
      this.endGame = this.endGame.bind(this);
  }
  newGame(e){
    e.preventDefault();
    this.setState({players: [], finalRound: false, winner: ['', 0]});
  }

  neverMind(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
      if( e.target !== e.currentTarget ){
        return;
      }
    }
    const showing = document.querySelectorAll('.modal');
    const curtain = document.getElementById('curtain');
    const modalHolder = document.getElementById('modal-holder');

    showing.forEach(element => { element.classList.add('hidden')});
    curtain.classList.add('hidden');
    modalHolder.classList.add('hidden');
  }

  newPlayerSubmit(e, modal){
    e.preventDefault();
    const newPlayerName = document.getElementById('newPlayer');
    if (!newPlayerName.value){
      return;
    }
    let rollers = this.state.players;
    let newPlayer = {
      name: newPlayerName.value,
      turn: 0,
      banked: 0,
      active: false,
      id: rollers.length + 1,
      ender: false
    };
    if(newPlayer.id === 1){ 
      newPlayer.active = true;
    }
    rollers.push(newPlayer);
    this.setState({players: rollers});
    this.toggleModal(e, modal);
    newPlayerName.value = '';
    const newPlayerButton = document.querySelector('#Scoreboard button');
    newPlayerButton.focus();
  }

  toggleModal(e, modal, etc){
    if(e){
      e.preventDefault();
      e.stopPropagation();
      if( e.target !== e.currentTarget ){
        return;
      }
    }
    const modalToToggle = document.getElementById(modal);
    const modalHolder = document.getElementById('modal-holder');
    const curtain = document.getElementById('curtain');
    const showElements = [modalToToggle, curtain, modalHolder];
    showElements.forEach(element =>{
      if (element.classList.contains('hidden')){
        element.classList.remove('hidden');
        const modalInput = document.querySelector(`#${modal} input`);
        modalInput.focus();
      } else {
        element.classList.add('hidden');
        const countEm = document.getElementById('countEm');
        countEm.focus();
      }
    });
  }
  nextPlayer(){
    let rollers = this.state.players;
    for(var i=0; i<rollers.length; i++){
      if(rollers[i].active){
        rollers[i].active = false;
        if (i === (rollers.length - 1) ) {
          rollers[0].active = true
          this.updateScoreboard(rollers);
          if(rollers[0].active && rollers[0].ender){
            this.updateScoreboard(rollers);
            this.toggleModal('', 'theEndModal', this.endGame());
            return;
          }
        } else {
          rollers[i+1].active = true;
          this.updateScoreboard(rollers);
          if(rollers[i+1].active && rollers[i+1].ender){
            this.toggleModal('', 'theEndModal', this.endGame());
            return;
          } 
        }
        break;
      }
    }
  }
  endGame(){
    var finalScores = [];
    this.state.players.forEach(player => {
      finalScores.push([player.name, player.banked]);
    })
    const findWinner = finalScores.sort(function(a, b) { return b[1] - a[1] } );
    const winner = findWinner[0];
    this.setState({winner: winner});
  }
  addRoll(points){
    if(points === '💣'){
      this.pigOut();
      return; 
    }
    let rollers = this.state.players;
    rollers.forEach(roller => {
      if( !roller.active ){ 
        return;
      } else {
        roller.turn += points;
        this.updateScoreboard(rollers);
      }
    })
  }
  bankPoints(){
    let rollers = this.state.players;
    for(var roller of rollers) {
      if( roller.active ){ 
        roller.banked += roller.turn; 
        roller.turn = 0;
        if(roller.banked >= 100 && this.state.finalRound === false){
          this.toggleModal('', 'beginTheEndModal');
          roller.ender = true;
          this.setState({finalRound: true});
        }
        this.nextPlayer();
        this.updateScoreboard(rollers);
        break;
      }
    }
  }
  pigOut(){
    let rollers = this.state.players;
    rollers.forEach(roller => {
      if (roller.active){
        roller.turn = 0;
      }
    })
    this.updateScoreboard(rollers);
    this.nextPlayer();
  }
  makinBacon(){
    let rollers = this.state.players;
    rollers.forEach(roller => {
      if (roller.active){
        roller.turn = 0;
        roller.banked = 0;
      }
    })
    this.updateScoreboard(rollers);
    this.nextPlayer();
  }
  updateScoreboard(obj){
    this.logUpdate();
    this.setState({ players: obj });
  }
  logUpdate(){
    const Log = document.getElementById('Log');
    const rollers = this.state.players;
    rollers.forEach(player => {
      if(player.active){
        Log.innerHTML += `${player.name} – banked: ${player.banked}; turn: ${player.turn}<br>`; 
      }
    })
  }
  render() {
    return (
      <div className="App">
        <Modals toggleModal={this.toggleModal} newPlayerSubmit={this.newPlayerSubmit} endGame={this.endGame} state={this.state} newGame={this.newGame} neverMind={this.neverMind} addPlayer={this.addPlayer}/>
        <AppHeader players={this.state.players} toggleModal={this.toggleModal} newGame={this.newGame}/>
        <Sidebar players={this.state.players} nextPlayer={this.nextPlayer} toggleModal={this.toggleModal}/>
        <ButtonBoard state={this.state} addRoll={this.addRoll} bankPoints={this.bankPoints} pigOut={this.pigOut} makinBacon={this.makinBacon} toggleModal={this.toggleModal}/>
        <Log />
      </div>
    );
  }
}

export default App;
