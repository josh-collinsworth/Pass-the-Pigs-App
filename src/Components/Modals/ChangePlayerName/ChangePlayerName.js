import React from 'react';
import Modal from '../Modal';

class ChangePlayerName extends Modal {
	constructor(props){
		super(props);
        this.state = {
            id: 'changePlayerNameModal'
        }
	}
    handleSubmit(e){
        e.preventDefault();
    	const newName = document.querySelector('#changePlayerNameModal input').value;
    	const playerID = document.querySelector('#changePlayerNameModal input').id;
        const rollers = this.props.state.players;
        if (newName.length <= 0) return;
        rollers.forEach(roller => {
            if(roller.id === Number(playerID)){
                this.props.logUpdate(`${roller.name} changed names to ${newName}`, false);
                roller.name = newName;
            }
        });
        this.props.updateScoreboard(rollers);
        this.handleToggle(e);
    }
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			<label htmlFor="playerNewName">Change player name:</label>
                <input type="text" id="playerNewName" onKeyDown={this.handleKeyDown}/>
                <div className="button-group">
                    <button onClick={this.handleToggle}>Never mind</button>
                    <input type="submit" value="OK"/>
                </div>
    		</form>
        );
    }
}

export default ChangePlayerName;