import React from 'react';
import Modal from '../Modal';

class NewGame extends Modal {
	constructor(props){
		super(props);
        this.state = {
            id: 'newGameModal'
        }
	}
    handleSubmit = (e) => {
        this.props.newGame(e);
        this.handleToggle(e);
    }
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			<p><strong>Are you sure you want to start a new game?</strong> All player data and scores will be erased!</p>
                <div className="button-group">
                    <button onClick={this.handleToggle}>Never mind!</button>
                    <input type="submit" value="OK" onKeyDown={this.handleKeyDown}/>
                </div>
    		</form>
        );
    }
}

export default NewGame;