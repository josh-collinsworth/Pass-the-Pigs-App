import React from 'react';
import Modal from './Modal';
import BeginTheEnd from './BeginTheEnd/BeginTheEnd';
import TheEnd from './TheEnd/TheEnd';
import NewGame from './NewGame/NewGame';
import NewPlayer from './NewPlayer/NewPlayer';
import AddPlayers from './AddPlayers/AddPlayers';
import NewGameSlap from './NewGameSlap/NewGameSlap';
import AddAnotherPlayer from './AddAnotherPlayer/AddAnotherPlayer';
import ChangePlayerName from './ChangePlayerName/ChangePlayerName';


class Modals extends React.Component {
    render(){
        return(
        	<div id="modal-holder" className="hidden">
        	<div id="curtain" className="hidden" onClick={this.props.neverMind}></div>
        	<Modal id="newPlayerModal">
        		<NewPlayer toggleModal={this.props.toggleModal} newPlayerSubmit={this.props.newPlayerSubmit} neverMind={this.props.neverMind}/>
        	</Modal>
        	<Modal id="changePlayerNameModal">
        		<ChangePlayerName toggleModal={this.props.toggleModal} state={this.props.state} neverMind={this.props.neverMind} updateScoreboard={this.props.updateScoreboard} logUpdate={this.props.logUpdate}/>
        	</Modal>
        	<Modal id="beginTheEndModal">
        		<BeginTheEnd toggleModal={this.props.toggleModal} players={this.props.state.players} neverMind={this.props.neverMind}/>
        	</Modal>
        	<Modal id="theEndModal">
        		<TheEnd toggleModal={this.props.toggleModal} endGame={this.props.endGame} winner={this.props.state.winner} neverMind={this.props.neverMind}/> 
        	</Modal>
        	<Modal id="newGameModal">
        		<NewGame toggleModal={this.props.toggleModal} newGame={this.props.newGame} neverMind={this.props.neverMind}/> 
        	</Modal>
        	<Modal id="addPlayersModal">
        		<AddPlayers toggleModal={this.props.toggleModal} newGame={this.props.newGame} neverMind={this.props.neverMind} addPlayer={this.props.addPlayer}/> 
        	</Modal>
        	<Modal id="newGameSlapModal">
        		<NewGameSlap toggleModal={this.props.toggleModal} newGame={this.props.newGame} neverMind={this.props.neverMind} addPlayer={this.props.addPlayer}/> 
        	</Modal>
        	<Modal id="addAnotherPlayerModal">
        		<AddAnotherPlayer toggleModal={this.props.toggleModal} newGame={this.props.newGame} neverMind={this.props.neverMind} addPlayer={this.props.addPlayer}/> 
        	</Modal>
        	</div>
        );
    }
}

export default Modals;