import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import SYMBOLS from '../../model/symbols';

import Statistics from './statistics';
import Settings from './settings';

import './modal.scss';

interface Props {
  modalWindow: string,
  onButtonClick: Function,
  userName: string,
  gamesTotal: number,
  gamesWon: number,
  difficultLevel: number;
  onDifficultyChange: Function;
}

export default class Modal extends Component<Props> {

  getComponent = (component: string) => {
    const { userName, gamesTotal, gamesWon, onDifficultyChange, difficultLevel } = this.props;
    switch(component) {
      case 'Statistics':
        return <Statistics userName={userName}
                           gamesTotal={gamesTotal}
                           gamesWon={gamesWon} />;
      case 'Settings':
        return <Settings level={difficultLevel} 
                         onDifficultyChange={onDifficultyChange} />;
      case 'ChangeUser':
        return '' // <ChangeUser />;
      default:
        return ';'
    }
  }

  render() {
    const { modalWindow, onButtonClick } = this.props;
    const className = modalWindow ? "modal border" : "modal border hidden";
    const ModalComponent = this.getComponent(modalWindow);
    return (
      <div className={className}>
        <h2 className="modal-title">{modalWindow}</h2>
        {ModalComponent}
        <button className="modal-button"
                type="button"
                onClick={() => onButtonClick()}>
                  <FontAwesomeIcon icon={SYMBOLS.OK} size="lg" />
                </button>
      </div>
    );
  }
}