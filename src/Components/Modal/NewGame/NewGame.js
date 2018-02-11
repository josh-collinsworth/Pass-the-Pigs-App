import React from 'react';

class NewGame extends React.Component {
	constructor(props){
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
    handleKeyDown(e){
        if (e.keyCode === 27) this.props.toggleModal(e, 'newGameModal');
    }
    handleToggle(e){
        console.log('Handling toggle!');
        this.props.toggleModal(e, 'newGameModal');
    }
    handleSubmit(e){
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