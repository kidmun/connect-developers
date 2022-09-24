import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItems.css';

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: false },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false }
];

const NavigationItems = (props) => {

    return <React.Fragment>
  {navItems.filter(item => item.auth === props.isAuth).map(item => (
    <li
      key={item.id}
      className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}
    >
      <NavLink to={item.link} onClick={props.onChoose}>
        {item.text}
      </NavLink>
    </li>
  ))}
  {!props.isAuth && <li className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}  key="logout">
      <button id="ki" onClick={props.onLogout}>Logout</button>
    </li>}
  </React.Fragment>
  };

export default NavigationItems;
