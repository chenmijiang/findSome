import React from 'react';

import ThemeSwitch from '../mini/ThemeSwitch';

import Style from './Navbar.module.scss';


// 导航栏，一些功能组件
function Navbar(){
  return (
    <nav>
      <ThemeSwitch></ThemeSwitch>
    </nav>
  );
}

export default Navbar;