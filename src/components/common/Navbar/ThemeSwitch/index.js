import React, { useState, useEffect,useCallback } from 'react';

import PropTypes from 'prop-types';

import Style from './ThemeSwitch.module.scss';

// 网页主题切换按钮
function ThemeSwitch(props) {
  // 切换按钮点击状态
  const [checked, setChecked] = useState(props.checked || false);
  // 处理切换事件
  const handleSwitch = useCallback((evt)=>{
    setChecked(evt.target.checked);
    // 这里不应该直接修改全局样式，应该抛出去
    // 而自身样式应该修改
    document
    .getElementsByTagName('body')[0]
    .classList.toggle('dark');
  },[])

  return (
    <div className={Style.sidebar_themeContainer}>
      <label
        labelfor="theme_toggle"
        className={[
          Style.sidebar_themeLabel,
          checked ? Style.switched : '',
        ].join(' ')}
      >
        <input
          className={Style.sidebar_themeInput}
          type="checkbox"
          id="theme_toggle"
          checked={checked}
          onChange={handleSwitch}
        />
        <div className={[Style.sidebar_themeType, Style.light].join(' ')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={Style.sidebar_listIcon}
          >
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
          </svg>
          <span className={Style.sidebar_themeInputText}>白天</span>
        </div>
        <div className={[Style.sidebar_themeType, Style.dark].join(' ')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={Style.sidebar_listIcon}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span className={Style.sidebar_themeInputText}>黑夜</span>
        </div>
      </label>
    </div>
  );
}

// 指定状态数据类型
ThemeSwitch.propTypes = {
  checkbox: PropTypes.bool,
};

export default ThemeSwitch;
