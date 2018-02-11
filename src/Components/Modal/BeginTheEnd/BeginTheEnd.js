import React from 'react';

class NewPlayer extends React.Component {
	constructor(props){
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
    handleKeyDown(e){
        if (e.keyCode === 27) this.props.toggleModal(e, 'beginTheEndModal');
    }
    handleToggle(e){
        console.log('Handling toggle!');
        this.props.toggleModal(e, 'beginTheEndModal');
    }
    handleSubmit(e){
        this.props.toggleModal(e, 'beginTheEndModal');
    }
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			<p>Final round! Every other player gets one last roll!</p>
    			<input type="submit" value="OK" onKeyDown={this.handleKeyDown}/>
    		</form>
        );
    }
}

export default NewPlayer;