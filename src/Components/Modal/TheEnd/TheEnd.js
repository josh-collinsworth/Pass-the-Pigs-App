import React from 'react';

class NewPlayer extends React.Component {
	constructor(props){
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
    handleKeyDown(e){
        if (e.keyCode === 27) this.props.toggleModal(e, 'theEndModal');
    }
    handleToggle(e){
        //console.log('Handling toggle!');
        this.props.toggleModal(e, 'theEndModal');
    }
    handleSubmit(e){
        this.props.toggleModal(e, 'theEndModal');
    }
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			<p><strong>{this.props.winner[0]}</strong> wins with {this.props.winner[1]} points! 🎉🐖🐖</p>
    			<input type="submit" value="OK" onKeyDown={this.handleKeyDown}/>
    		</form>
        );
    }
}

export default NewPlayer;