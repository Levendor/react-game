import React, { Component } from 'react';

import './settings.scss';

interface Props {
  difficultyValue: number;
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
}

export default class Settings extends Component<Props> {
  getDifficultyLabel = (value: number) => {
    const str = `${value}`;
    switch(str) {
      case '1':
        return 'Easy';
      case '2':
        return 'Normal';
      case '3':
        return 'Hard';
      default:
        return '';
    }
  }

  getAudioLabel = (value: number) => {
    const str = `${value}`;
    switch(str) {
      case '0':
        return 'Mute';
      case '0.5':
        return 'Quiet';
      case '1':
        return 'Normal';
      default:
        return '';
    }
  }

  getMusicLabel = (value: number) => {
    const str = `${value}`;
    switch(str) {
      case '0':
        return 'Mute';
      case '0.05':
        return 'Quiet';
      case '0.1':
        return 'Normal';
      default:
        return '';
    }
  }

  getThemeLabel = (value: number) => {
    const str = `${value}`;
    switch(str) {
      case '1':
        return 'Light';
      case '2':
        return 'Dark';
      default:
        return '';
    }
  }

  onDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onDifficultyChange(+event.target.value);
  }

  onBestOfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onBestOfChange(+event.target.value);
  }

  onAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onAudioChange(+event.target.value);
  }

  onMusicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onMusicChange(+event.target.value);
  }

  onThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onThemeChange(+event.target.value);
  }

  render() {
    const { difficultyValue, bestOfValue, audioValue, musicRenderValue, themeValue } = this.props;
    const difficultyLabel = this.getDifficultyLabel(difficultyValue)
    const audioLabel = this.getAudioLabel(audioValue);
    const musicLabel = this.getMusicLabel(musicRenderValue);
    const themeLabel = this.getThemeLabel(themeValue);
    return (
      <div className="settings-container">
        <div className="settings-difficulty">
          <h3>
            Difficulty level:
            <label htmlFor="difficulty">{difficultyLabel}</label>
          </h3>
          <input id="difficulty"
                type="range" 
                value={difficultyValue}
                onChange={this.onDifficultyChange}
                min="1"
                max="3"
                step="1"
                list="difficultyList" />
          <datalist id="difficultyList">
            <option value="1"/>
            <option value="2"/>
            <option value="3"/>
          </datalist>
        </div>

        <div className="settings-best-of">
          <h3>
            Best of:
            <label htmlFor="bestOf">{bestOfValue}</label>
          </h3>
          <input id="bestOf"
                type="range" 
                value={bestOfValue}
                onChange={this.onBestOfChange}
                min="1"
                max="3"
                step="1"
                list="bestOfList" />
          <datalist id="bestOfList">
            <option value="1"/>
            <option value="2"/>
            <option value="3"/>
          </datalist>
        </div>

        <div className="settings-audio">
          <h3>
            Sound volume:
            <label htmlFor="audio">{audioLabel}</label>
          </h3>
          <input id="audio"
                type="range" 
                value={audioValue}
                onChange={this.onAudioChange}
                min="0"
                max="1"
                step="0.5"
                list="audioList" />
          <datalist id="audioList">
            <option value="0"/>
            <option value="0.5"/>
            <option value="1"/>
          </datalist>
        </div>

        <div className="settings-music">
          <h3>
            Music volume:
            <label htmlFor="music">{musicLabel}</label>
          </h3>
          <input id="music"
                type="range" 
                value={musicRenderValue}
                onChange={this.onMusicChange}
                min="0"
                max="0.1"
                step="0.05"
                list="musicList" />
          <datalist id="musicList">
            <option value="0"/>
            <option value="0.05"/>
            <option value="0.1"/>
          </datalist>
        </div>

        <div className="settings-theme">
          <h3>
            Theme:
            <label htmlFor="theme">{themeLabel}</label>
          </h3>
          <input id="theme"
                type="range" 
                value={themeValue}
                onChange={this.onThemeChange}
                min="1"
                max="2"
                step="1"
                list="themeList" />
          <datalist id="themeList">
            <option value="1"/>
            <option value="2"/>
          </datalist>
        </div>
      </div>
    );
  }
}