import React from 'react';
import './AppHeader.css'

class AppHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleNewGame = this.handleNewGame.bind(this);
    }
    handleNewGame(e){
        this.props.toggleModal(e, 'newGameModal');
    }
    render(){
        return(
        	<header className="App-header">
                <h1 className="App-title">
        		{this.props.players.map(player => {
                    if(player.active === false) { return ''; }
                    return (<span key={player.name}><strong>{player.name}: </strong><small>{player.banked} + {player.turn} ({player.banked+player.turn})</small></span>);
                })}
                </h1>
                <div>
				    <button onClick={this.handleNewGame}>New game</button> 
                </div>
			</header>
        );
    }
}

export default AppHeader;