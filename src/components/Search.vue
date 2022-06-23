<template>
  <div class="search-box">
    <div class="header">
      <div class="header-detail">{{ config['header-detail'] }}</div>
    </div>
    <div class="content">
      <div class="engine-select" data-value="1">谷歌</div>
      <div class="input">
        <input type="text" placeholder="请输入搜索内容" id="input-content">
        <div class="sugBox">
          <ul class="sugs"></ul>
        </div>
      </div>
      <button id="search">搜索</button>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script setup>
import config from '../config/config.json';



</script>
<style lang="scss" scoped>
@import '../assets/defineValue';
@import '../assets/device';

.search-box {
  width: 900px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  @include w_ml {
    width: 90%;
    top: 42%;
  }
}

.content {
  background-color: $base-box-bg;
  border-radius: 60px;

  @include w_ml {
    width: 100%;
    height: $phone-search-height;
  }
}

.header {
  margin-bottom: 20px;

  .header-detail {
    font-size: 32px;

    @include w_ml {
      font-size: 1.6rem;
    }
  }
}

.content {
  display: flex;
  width: 84%;
  margin: 0 auto;
  height: $base-search-height;
}

// 引擎选择
.engine-select {
  border: 1px solid $base-line-color;
  border-right: 0;
  border-radius: 60px 0 0 60px;
  background-color: inherit;
  padding: 0 24px;
  line-height: $base-search-height;
  cursor: pointer;

  @include w_ml {
    padding: 0 1rem;
    line-height: $phone-search-height;
  }

  &:hover {
    background-color: $base-button-active;
  }
}

// 输入框样式
.input {
  flex: 1;

  #input-content {
    width: 100%;
    height: 100%;

    border: 1px solid $base-line-color;
    border-radius: 0;
    padding: 0px 14px;
    font-size: 14px;
    color: inherit;
    background-color: inherit;

    @include w_ml {
      font-size: 0.7rem;
      padding: 0px 0.7rem;
    }

    &:focus {
      outline: 0;
    }
  }
}

// 按钮样式
#search {
  border: 1px solid $base-line-color;
  border-left: 0;
  padding: 0px 24px 0;
  border-radius: 0px 60px 60px 0px;
  background-color: inherit;
  cursor: pointer;

  @include w_ml {
    padding: 0px 1rem;
  }

  &:hover {
    background-color: $base-button-active;
  }
}

//推荐选项
.sugBox {
  display: none;
  height: 300px;
  overflow: hidden;

  border: 1px solid $base-line-color;
  border-top: none;
  box-sizing: content-box;
  background-color: $base-search-height;

  @include w_ml {
    height: 10rem;
  }

  .sugs {
    height: calc(100% + 20px);
    overflow: scroll;
    width: calc(100% + 20px);

    @include w_l {
      height: calc(100% + 0.9rem);
      width: calc(100% + 1rem);
    }

    @include w_ml {
      height: calc(100% + 0.1rem);
      width: calc(100% + 0.3rem);
    }
  }

  .sug {
    list-style: none;
    position: relative;
    padding: 4px 14px;
    font-size: 16px;
    font-family: sans-serif;
    letter-spacing: 1px;
    text-align: left;
    line-height: 32px;
    cursor: pointer;

    @include w_ml {
      padding: 0.2rem 0.7rem;
      font-size: 0.8rem;
      line-height: 1.8rem;
    }

    &::after {
      content: '';
      width: 96%;
      height: 1px;
      position: absolute;
      top: 101%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      background-color: $base-line-color;
    }
  }

  .sug.select {
    background-color: $base-button-active;
  }
}

.sugBox.active {
  display: block;
}
</style>