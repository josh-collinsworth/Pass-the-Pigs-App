import React from 'react';
import Modal from '../Modal';

import './NewPlayer.css';

class NewPlayer extends Modal {
	constructor(props){
		super(props);
        this.state = {
            id: 'newPlayerModal'
        }
	}
    handleSubmit(e){
        this.props.newPlayerSubmit(e, 'newPlayerModal');
        this.props.toggleModal(e, 'addAnotherPlayerModal');
    }
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			<label htmlFor="newPlayer">Player name:</label>
    			<input type="text" id="newPlayer" onKeyDown={this.handleKeyDown}/>
    			<input type="submit" value="Add player" />
    		</form>
        );
    }
}

export default NewPlayer;