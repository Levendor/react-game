import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SYMBOLS from '../../../model/symbols';

import './change-user.scss';

interface Props {
  userName: string;
  onUserButtonClick: Function;
  userList: string[];
}

interface State {
  inputValue: string;
  selectedValue: any;
}

export default class ChangeUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      selectedValue: '',
    }
  }

  onButtonClick = () => {
    const {inputValue, selectedValue } = this.state;
    const { userName } = this.props;
    const name = inputValue || selectedValue || userName;
    this.props.onUserButtonClick(name);
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  onSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedValue: event.target.value,
    })
  }

  render() {
    const { inputValue, } = this.state;
    const { userList } = this.props;
    return (
      <div className="change-user-container">
        <div className="change-user-input-container">
          <input value={inputValue}
                 type="text"
                 placeholder="type user name" 
                 className="change-user-input"
                 onChange={this.onInputChange} />
          <button className="change-user-submit"
                  onClick={this.onButtonClick}>
            <FontAwesomeIcon icon={SYMBOLS.USER} size="lg" />
          </button>
        </div>
        <div className="change-user-list-container">
          <select className="change-user-list"
                  size={10}
                  onChange={this.onSelectUser} >
            {userList.map((user) => {
              return <option key={user} value={user}>
                       {user}
                     </option>
            })}
          </select>
        </div>
      </div>
    );
  }
}