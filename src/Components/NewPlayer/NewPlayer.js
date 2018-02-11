import React from 'react';
import './NewPlayer.css';

class NewPlayer extends React.Component {
	constructor(props){
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
    handleKeyDown(e){
        if (e.keyCode === 27) this.props.toggleModal(e, 'newPlayerModal');
    }
    handleToggle(e){
        console.log('Handling toggle!');
        this.props.toggleModal(e, 'newPlayerModal');
    }
    handleSubmit(e){
        this.props.newPlayerSubmit(e, 'newPlayerModal');
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