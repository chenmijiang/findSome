import React from "react";

// 搜索框
function Search() {
  return (
    <div className="search-box">
      <div className="header">
        <div className="header-detail"></div>
      </div>
      <div className="content">
        <div className="engine-select" data-value="1">
          谷歌
        </div>
        <div className="input">
          <input type="text" placeholder="请输入搜索内容" id="input-content" />
          <div className="sugBox">
            <ul className="sugs"></ul>
          </div>
        </div>
        <button id="search">搜索</button>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Search;