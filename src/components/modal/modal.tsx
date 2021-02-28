import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import SYMBOLS from '../../model/symbols';

import './modal.scss';

interface Props {
  modalWindow: string,
  onButtonClick: Function,
}

export default class Modal extends Component<Props> {
  render() {
    const { modalWindow, onButtonClick } = this.props;
    const className = modalWindow ? "modal border" : "modal border hidden";
    return (
      <div className={className}>
        <h2 className="modal-title">{modalWindow}</h2>
        <button className="modal-button"
                type="button"
                onClick={() => onButtonClick()}>
                  <FontAwesomeIcon icon={SYMBOLS.OK} size="lg" />
                </button>
      </div>
    );
  }
}