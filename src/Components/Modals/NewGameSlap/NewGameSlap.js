import React from 'react';
import Modal from '../Modal';

class NewGameSlap extends Modal {
	constructor(props){
		super(props);
        this.state = {
            id: 'newGameSlapModal'
        }
    }
    handleAdd = (e) => {
        this.props.toggleModal(e, 'newGameSlapModal');
    }   
    handleNewGame = (e) => {
        this.props.toggleModal(e, 'newGameSlapModal');
        this.props.toggleModal(e, 'newGameModal');
    }
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			<p><strong>Psssst!</strong><i> The game is over!</i> You should probably start a new game.</p>
                <div className="button-group">
                    <input type="submit" value="Whatever" />
                    <button onClick={this.handleNewGame}>New Game</button>
                </div>
    		</form>
        );
    }
}

export default NewGameSlap;