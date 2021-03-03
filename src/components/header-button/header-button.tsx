import React, { Component, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './header-button.scss';

interface Props {
  title: string,
  onButtonClick: any,
  faIcon: IconProp,
}

export default class HeaderButton extends Component<Props> {
  getProperLetter = (title: string) => {
    switch(title) {
      case 'New game':
        return 'N';
      case 'Statistics':
        return 'S';
      case 'Settings':
        return 'P';
      case 'Autoplay':
        return 'R';
      case 'Change user':
        return 'U';
      case 'Music':
        return 'M';
      case 'Fullscreen':
        return 'F';
    }
  }

  componentDidMount = () => {
    console.log(this.props.title)
    document.addEventListener('keypress', (event) => {
      if (event.code === `Key${this.getProperLetter(this.props.title)}` && event.shiftKey === true) {
        this.props.onButtonClick();
      }
    });
  }

  onKeyPress = (event: KeyboardEvent): void => {
    if (event.code === `Key${this.getProperLetter(this.props.title)}` && event.shiftKey === true) {
      this.props.onButtonClick();
    }
  }

  render() {
    return (
      <button
        id={this.props.title}
        title={this.props.title}
        className={"header-button"}
        onClick={this.props.onButtonClick}
        type="button"
        onKeyPress={this.onKeyPress}
      >
        <FontAwesomeIcon icon={this.props.faIcon} size="lg" />
      </button>
    );
  }
}