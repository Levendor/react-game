import React, { Component } from 'react';

import './settings.scss';

interface Props {
  level: number;
  onDifficultyChange: Function;
}

export default class Settings extends Component<Props> {
  getLabel = (value: number) => {
    const str = `${value}`;
    console.log(str);
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

  onDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onDifficultyChange(event.target.value);
  }

  render() {
    const { level } = this.props;
    const label = this.getLabel(level)
    console.log(label);
    return (
      <div className="settings-container">
        <div className="settings-difficulty">
          <h3>
            Difficulty level:
            <label htmlFor="difficulty">{label}</label>
          </h3>
          <input id="difficulty"
                type="range" 
                value={level}
                onChange={this.onDifficultyChange}
                min="1"
                max="3"
                step="1"
                list="difficultyList" />
          <datalist id="difficultyList">
            <option value={1}/>
            <option value={2}/>
            <option value={3}/>
          </datalist>
        </div>
      </div>
    );
  }
}