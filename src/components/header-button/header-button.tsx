import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './header-button.scss';

interface Props {
  title: string,
  onButtonClick: any,
  faIcon: IconProp,
}

export default class HeaderButton extends Component<Props> {
  render() {
    return (
      <button
        title={this.props.title}
        className={"header-button"}
        onClick={this.props.onButtonClick}
        type="button"
      >
        <FontAwesomeIcon icon={this.props.faIcon} size="lg" />
      </button>
    );
  }
}