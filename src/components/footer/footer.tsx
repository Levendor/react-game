import React, { Component } from 'react';
import logo from "../../assets/rs_school_js.svg";
import './footer.scss';

export default class Footer extends Component{
  render() {
    return (
      <footer className="footer border">
        <div className="footer_links">
          <a href="https://github.com/Levendor">
            <span>[GitHub] Levendor</span>
          </a>
        </div>
        <span className="footer_year">2021</span>
        <div className="footer_logo">
          <a href="https://rs.school/js/">
            <img className="footer_img" src={logo} alt="logo" />
          </a>
        </div>
      </footer>
    );
  }
}