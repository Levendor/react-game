import React, { Component } from 'react';
import { v4 } from 'uuid';
import { HEADER_BUTTONS_TITLES } from '../../model/constants';
import SYMBOLS from '../../model/symbols';
import HeaderButton from '../header-button';
import './header.scss';

interface Props {
  callbacks: Function[];
}

export default class Header extends Component<Props> {
  render() {
    const { callbacks } = this.props;
    const symbols = SYMBOLS.HEADER_BUTTONS_SYMBOLS;
    const titles = HEADER_BUTTONS_TITLES;
    return (
      <header className="header border">
        <span className="header_title">Морской бой</span>
        <nav className="header_navbar">
          {
            titles.map((title, index) => {
              return <HeaderButton title={title}
                                   onButtonClick={() => callbacks[index](title)}
                                   faIcon={symbols[index]}
                                   key={v4()}
            />
            })
          }
        </nav>
      </header>
    );

  }
}