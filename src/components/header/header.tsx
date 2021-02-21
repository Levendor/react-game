import React, { Component } from 'react';
import { faChartLine, faRobot, faSync, faTools, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import HeaderButton from '../header-button';
import './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header className="header border">
        <span className="header_title">Морской бой</span>
        <nav className="header_navbar">
          <HeaderButton 
            title="New Game"
            onButtonClick={ () => console.log('New game') }
            faIcon={faSync}
          />
          <HeaderButton 
            title="Statistics"
            onButtonClick={ () => console.log('Statistics') }
            faIcon={faChartLine}
          />
          <HeaderButton 
            title="Settings"
            onButtonClick={ () => console.log('Settings') }
            faIcon={faTools}
          />
          <HeaderButton 
            title="Autoplay"
            onButtonClick={ () => console.log('Autoplay') }
            faIcon={faRobot}
          />
          <HeaderButton 
            title="Change User"
            onButtonClick={ () => console.log('Change User') }
            faIcon={faUserFriends}
          />
        </nav>
      </header>
    );

  }
}