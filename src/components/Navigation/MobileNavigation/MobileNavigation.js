import React from 'react';
import { useSelector } from 'react-redux';

import NavigationItems from '../NavigationItems/NavigationItems';
import './MobileNavigation.css';

const MobileNavigation = (props) => {
  const token = useSelector(state => state.status.token);
  
  return <nav className={['mobile-nav', props.open ? 'open' : ''].join(' ')}>
    <ul
      className={['mobile-nav__items', props.mobile ? 'mobile' : ''].join(' ')}
    >
      <NavigationItems
        mobile
        onChoose={props.onChooseItem}
        isAuth={token.length > 0}
        onLogout={props.onLogout}
      />
    </ul>
  </nav>
};

export default MobileNavigation;
