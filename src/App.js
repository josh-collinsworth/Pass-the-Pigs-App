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
        players: [
        //Got a couple players ready to go for testing purposes
        /*{
          name: 'Biggs',
          turn: 0,
          banked: 0,
          active: true,
          id: 1,
          ender: false
        },
        {
          name: 'Wedge',
          turn: 0,
          banked: 0,
          active: false,
          id: 2,
          ender: false
        }*/],
        round: 1
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
      this.onUnload = this.onUnload.bind(this);
  }
  newGame(e){
    e.preventDefault();
    this.setState({players: [], finalRound: false, winner: ['', 0], round: 1});
    const Sidebar = document.querySelector('.App-sidebar');
    Sidebar.classList.add('slide-in');
    this.logUpdate('A NEW GAME STARTS NOW!', false);
  }

  onUnload(event) { // the method that will be used for both add and remove event
    console.log("hellooww")
    event.returnValue = "Hellooww"
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
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
    const countEm = document.getElementById('countEm');

    showing.forEach(element => { element.classList.add('hidden')});
    curtain.classList.add('hidden');
    modalHolder.classList.add('hidden');
    countEm.focus();
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
    this.logUpdate(`${newPlayer.name} has joined the game!`, false);
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
    showElements.forEach(element => {
      if (element.classList.contains('hidden')){
        element.classList.remove('hidden');
        if(modal === 'changePlayerNameModal'){
          const nameInput = document.querySelector('#changePlayerNameModal input');
          nameInput.value = etc[0];
          nameInput.id = etc[1];
        }
        const modalInput = (modal === 'addAnotherPlayerModal') ? document.querySelector(`#${modal} button`) : document.querySelector(`#${modal} input`);
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
          rollers[0].active = true;
          this.logUpdate(` begins round ${this.state.round + 1}`);
          this.setState({round: this.state.round + 1});
          this.logUpdate('\'s turn!')
          this.updateScoreboard(rollers); 
          if(rollers[0].active && rollers[0].ender){
            this.logUpdate(' WINS!');
            this.updateScoreboard(rollers);
            this.toggleModal('', 'theEndModal', this.endGame());
            return;
          }
        } else {
          rollers[i+1].active = true;
          this.logUpdate('\'s turn!')
          this.updateScoreboard(rollers);
          if(rollers[i+1].active && rollers[i+1].ender){
            this.logUpdate(' WINS!');            
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
    });
  }

  bankPoints(){
    this.logUpdate(' banked!')
    let rollers = this.state.players;
    for(var roller of rollers) {
      if( roller.active ){ 
        roller.banked += roller.turn; 
        roller.turn = 0;
        if(roller.banked >= 100 && this.state.finalRound === false){
          this.logUpdate(' banked 100+ and began the endgame!')
          this.toggleModal('', 'beginTheEndModal');
          roller.ender = true;
          this.setState({finalRound: true});
        }
        // this.logUpdate();
        this.updateScoreboard(rollers);
        this.nextPlayer();
        break;
      }
    }
    const bankButton = document.querySelector('#bank');
    bankButton.blur();
  }

  pigOut(){
    this.logUpdate(' pig-out')
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
        this.logUpdate(' MADE BACON!!! 😱🥓 Back to 0!')
      }
    })
    this.updateScoreboard(rollers);
    this.nextPlayer();
  }

  updateScoreboard(obj){
    this.setState({ players: obj });
    this.logUpdate();
  }

  logUpdate(message, inclActiveName = true){
    const Log = document.getElementById('Log');
    const rollers = this.state.players;
    rollers.forEach(player => {
      if(player.active){
        if(message && inclActiveName){
          Log.innerHTML += `========== ${player.name}${message} ==========<br>`;
        } else if (message){
          Log.innerHTML += `========== ${message} ==========<br>`;        
        } else {
          Log.innerHTML += `${player.name} --- banked: ${player.banked} | turn: ${player.turn}<br>`; 
        }
      }
    })
    Log.scrollTop = Log.scrollHeight;
  }

  render() {
    return (
      <div className="App">
        <Modals toggleModal={this.toggleModal} newPlayerSubmit={this.newPlayerSubmit} endGame={this.endGame} state={this.state} newGame={this.newGame} neverMind={this.neverMind} addPlayer={this.addPlayer} updateScoreboard={this.updateScoreboard} logUpdate={this.logUpdate}/>
        <AppHeader players={this.state.players} toggleModal={this.toggleModal} newGame={this.newGame}/>
        <Sidebar players={this.state.players} nextPlayer={this.nextPlayer} toggleModal={this.toggleModal}/>
        <ButtonBoard state={this.state} addRoll={this.addRoll} bankPoints={this.bankPoints} pigOut={this.pigOut} makinBacon={this.makinBacon} toggleModal={this.toggleModal}/>
        <Log />
      </div>
    );
  }
}

export default App;