import React, { Component } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import ButtonBoard from './Components/ButtonBoard/ButtonBoard';
import Log from './Components/Log/Log';
import NewPlayer from './Components/NewPlayer/NewPlayer';
import AppHeader from './Components/AppHeader/AppHeader';
import Modal from './Components/Modal/Modal';
import BeginTheEnd from './Components/Modal/BeginTheEnd/BeginTheEnd';
import TheEnd from './Components/Modal/TheEnd/TheEnd';
import NewGame from './Components/Modal/NewGame/NewGame';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        finalRound: false,
        winner: ['', 0],
        players: [{
          name: 'Thom',
          turn: 0,
          banked: 90,
          active: true,
          id: 1,
          ender: false
        },
        {
          name: 'Jane',
          turn: 0,
          banked: 80,
          active: false,
          id: 2,
          ender: false
        },
        {
          name: 'Erika',
          turn: 0,
          banked: 55,
          active: false,
          id: 3,
          ender: false
        }],
        hideInactive: false
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
    this.setState({players: []});
  }

  neverMind(e){
    if(e){
      console.log(e.target);
      e.preventDefault();
      e.stopPropagation();
      if( e.target !== e.currentTarget ){
        return;
      }
    }
    const showing = document.querySelectorAll('.modal');
    const curtain = document.getElementById('curtain');

    showing.forEach(element => { element.classList.add('hidden')});
    curtain.classList.add('hidden');
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
      console.log(e.target);
      e.preventDefault();
      e.stopPropagation();
      if( e.target !== e.currentTarget ){
        return;
      }
    }
    const modalToToggle = document.getElementById(modal);
    // console.log(modalToToggle);
    // console.log(modal);
    const curtain = document.getElementById('curtain');
    const showElements = [modalToToggle, curtain];
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
    //console.log('Next!!')
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
    //console.log(finalScores);
    const findWinner = finalScores.sort(function(a, b) { return b[1] - a[1] } );
    const winner = findWinner[0];
    this.setState({winner: winner});
    //alert('Game is over!' + winner);
  }
  addRoll(points){
    if(points === '💣'){
      this.pigOut();
      return; 
    }
    //console.log('Adding!');
    let rollers = this.state.players;
    //console.log(points);
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
    //console.log(rollers);
    for(var roller of rollers) {
      if( roller.active ){ 
        //console.log(roller.name + ' is gonna bank now!');
        roller.banked += roller.turn; 
        roller.turn = 0;
        if(roller.banked >= 100 && this.state.finalRound === false){
          this.toggleModal('', 'beginTheEndModal');
          //alert('Final round! Every other player gets one last roll!');
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
    //console.log(obj)
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
        <div id="curtain" className="hidden" onClick={this.neverMind}></div>
        <Modal id="newPlayerModal">
          <NewPlayer toggleModal={this.toggleModal} newPlayerSubmit={this.newPlayerSubmit}/>
        </Modal>
        <Modal id="beginTheEndModal">
          <BeginTheEnd toggleModal={this.toggleModal}/>
        </Modal>
        <Modal id="theEndModal">
          <TheEnd toggleModal={this.toggleModal} endGame={this.endGame} winner={this.state.winner}/> 
        </Modal>
        <Modal id="newGameModal">
          <NewGame toggleModal={this.toggleModal} newGame={this.newGame}/> 
        </Modal>
        <AppHeader players={this.state.players} toggleModal={this.toggleModal} newGame={this.newGame}/>
        <Sidebar players={this.state.players} nextPlayer={this.nextPlayer} toggleModal={this.toggleModal} changePlayerName={this.changePlayerName} />
        <ButtonBoard rolls={this.state.scoringRolls} addRoll={this.addRoll} diceCombos={this.state.diceCombos } bankPoints={this.bankPoints} pigOut={this.pigOut} makinBacon={this.makinBacon}/>
        <Log />
      </div>
    );
  }
}

export default App;
