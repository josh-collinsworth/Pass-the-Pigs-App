import React from 'react';
import './AppHeader.css'

class AppHeader extends React.Component {
    handleNewGame = (e) => {
        this.props.toggleModal(e, 'newGameModal');
    }
    handleAddPlayer = (e) => {
        this.props.toggleModal(e, 'newPlayerModal');
    }
    mobileSlideToggle = () => {
        const appSidebar = document.querySelector('.App-sidebar');
        if(appSidebar.classList.contains('slide-in')){
            appSidebar.classList.remove('slide-in');
        } else {
            appSidebar.classList.add('slide-in');
        }
    }
    render(){
        return(
        	<header className="App-header">
                <h1 className="App-title">
                <input type="checkbox" id="mobile-slider" onChange={this.mobileSlideToggle}/>
                <label htmlFor="mobile-slider">{/*Label handled with emoji in CSS */}</label>
        		&ensp;{this.props.players.map(player => {
                    if(player.active === false) { return ''; }
                    return (<span key={player.name}><strong>{player.name}: </strong><small>{player.banked} + {player.turn} ({player.banked+player.turn})</small></span>);
                })}
                </h1>
                <div>
				    <button onClick={this.props.players.length <= 0 ? this.handleAddPlayer : this.handleNewGame}>
                        {this.props.players.length > 0 ? 'New game' : 'Add players'}
                    </button> 
                </div>
			</header>
        );
    }
}

export default AppHeader;