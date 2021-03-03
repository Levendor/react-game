import React, { Component } from 'react';
import { HEADER_BUTTONS_TITLES } from '../../model/constants';
import SYMBOLS from '../../model/symbols';
import HeaderButton from '../header-button';
import './header.scss';

interface Props {
  callbacks: Function[];
  isPlay: boolean,
}

export default class Header extends Component<Props> {
  render() {
    const { callbacks, isPlay } = this.props;
    const symbols = SYMBOLS.HEADER_BUTTONS_SYMBOLS;
    const titles = HEADER_BUTTONS_TITLES;
    return (
      <header className="header border">
        <span className="header_title">Морской бой</span>
        <nav className="header_navbar">
          {
            titles.map((title, index) => {
              let icon;
              if (title === "Music") {
                if (isPlay) icon = SYMBOLS.STOP;
                else icon = SYMBOLS.MUSIC;
              } else icon = symbols[index];
              return <HeaderButton title={title}
                                   onButtonClick={() => callbacks[index](title)}
                                   faIcon={icon}
                                   key={title}
            />
            })
          }
        <HeaderButton title="Fullscreen"
                      onButtonClick={() => callbacks[callbacks.length - 1]('Fullscreen')}
                      faIcon={SYMBOLS.FULLSCREEN}
                      key="Fullscreen"
        />
        </nav>
      </header>
    );

  }
}