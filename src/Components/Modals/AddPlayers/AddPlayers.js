import React from 'react';
import Modal from '../Modal';

class AddPlayers extends Modal {
	constructor(props){
		super(props);
        this.state = {
            id: 'addPlayersModal'
        }
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleAdd(e){
        this.props.toggleModal(e, 'addPlayersModal');
        this.props.toggleModal(e, 'newPlayerModal');
    }   
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			<p><strong>This game is best played with at least 2 players</strong><i> (and this app doesn't really work very well with fewer).</i> Add some players to get started!</p>
                <div className="button-group">
        			<input type="submit" value="Whatever" onKeyDown={this.handleKeyDown}/>
                    <button onClick={this.handleAdd}>Add Player</button>
                </div>
    		</form>
        );
    }
}

export default AddPlayers;