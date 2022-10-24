import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../Button/LogutButton';

import './NavigationItems.css';

const navItems = [
  { id: 'users', text: 'Users', link: '/users', auth: true },
  { id: 'projects', text: 'Projects', link: '/projects', auth: true },
  { id: 'messages', text: 'Messages', link: '/messages', auth: true },
  { id: 'post-project', text: 'Post', link: '/add-post', auth: true},
  { id: 'add-proect', text: 'Add Project', link: '/add-project', auth: true },
  { id: 'account', text: 'Account', link: '/account', auth: true },
  { id: 'login', text: 'Login', link: '/login', auth: false },
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
  {props.isAuth && <li className={['navigation-item', props.mobile ? 'mobile' : ''].join(' ')}  key="logout">
      <LogoutButton onClick={props.onLogout}>Logout</LogoutButton>
    </li>}
  </React.Fragment>
  };

export default NavigationItems;
