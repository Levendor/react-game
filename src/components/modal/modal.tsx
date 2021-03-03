import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import SYMBOLS from '../../model/symbols';

import Statistics from './statistics';
import Settings from './settings';
import ChangeUser from './change-user';

import './modal.scss';

interface Props {
  modalWindow: string,
  onCloseButtonClick: Function,
  userName: string,
  gamesTotal: number,
  gamesWon: number,
  difficultLevel: number;
  onDifficultyChange: Function;
  bestOfValue: number;
  onBestOfChange: Function;
  audioValue: number;
  onAudioChange: Function;
  musicRenderValue: number;
  musicValue: number;
  onMusicChange: Function;
  themeValue: number;
  onThemeChange: Function;
  userList: string[];
  onUserButtonClick: Function;
}

export default class Modal extends Component<Props> {

  getComponent = (component: string) => {
    const { userName, gamesTotal, gamesWon, onDifficultyChange, difficultLevel, bestOfValue, onBestOfChange, audioValue, onAudioChange, musicRenderValue,musicValue, onMusicChange, themeValue, onThemeChange, userList, onUserButtonClick } = this.props;
    switch(component) {
      case 'Statistics':
        return <Statistics userName={userName}
                           gamesTotal={gamesTotal}
                           gamesWon={gamesWon} />;
      case 'Settings':
        return <Settings difficultyValue={difficultLevel} 
                         onDifficultyChange={onDifficultyChange}
                         bestOfValue={bestOfValue}
                         onBestOfChange={onBestOfChange}
                         audioValue={audioValue}
                         onAudioChange={onAudioChange}
                         musicRenderValue={musicRenderValue}
                         musicValue={musicValue}
                         onMusicChange={onMusicChange}
                         themeValue={themeValue}
                         onThemeChange={onThemeChange} />;
      case 'Change User':
        return <ChangeUser userName={userName}
                           userList={userList}
                           onUserButtonClick={onUserButtonClick} />;
      default:
        return ';'
    }
  }

  render() {
    const { modalWindow, onCloseButtonClick } = this.props;
    const className = modalWindow ? "modal border" : "modal border hidden";
    const ModalComponent = this.getComponent(modalWindow);
    return (
      <div className={className}>
        <h2 className="modal-title">{modalWindow}</h2>
        {ModalComponent}
        <button className="modal-button"
                type="button"
                onClick={() => onCloseButtonClick()}>
                  <FontAwesomeIcon icon={SYMBOLS.OK} size="lg" />
                </button>
      </div>
    );
  }
}