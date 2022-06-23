<template>
  <div class="sidebar-themeContainer">
    <label labelfor="theme-toggle" class="sidebar-themeLabel switched">
      <input class="sidebar-themeInput" type="checkbox" id="theme-toggle">
      <div class="sidebar-themeType light">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="sidebar-listIcon">
          <circle cx="12" cy="12" r="5"></circle>
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42">
          </path>
        </svg>
        <span class="sidebar-themeInputText">白天</span>
      </div>
      <div class="sidebar-themeType dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="sidebar-listIcon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <span class="sidebar-themeInputText">黑夜</span>
      </div>
    </label>
  </div>
</template>
<script>

</script>
<style lang="scss" scoped>
@import "../assets/defineValue";
@import "../assets/device";

.sidebar-themeContainer {
  $theme-box-radius: 6px;
  width: 180px;
  height: 60px;
  background-color: #0000;
  border-radius: $theme-box-radius;
  position: absolute;
  top: 16px;
  right: 32px;
  padding: 5px;
  line-height: 50px;

  @include w_ml {
    $theme-box-radius: 6px;
    width: 7rem;
    height: 3rem;
    font-size: 0.6rem;
    top: 1rem;
    right: 1rem;
    line-height: 3rem;
  }

  .sidebar-themeLabel {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: $base-button-active;
    border-radius: $theme-box-radius;
    justify-content: space-around;
    position: relative;

    //切换滑块
    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      display: inline-block;
      width: calc(50% - 2px);
      height: calc(100% - 5px);
      border-radius: $theme-box-radius;
      background-color: $base-box-bg;
      left: 2px;
      top: 50%;
      transform: translatey(-50%);
      transition: left 0.3s ease;
    }
  }

  .sidebar-themeInput {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;

    @include w_ml {
      display: none;
    }
  }

  .sidebar-themeType {
    z-index: 10;
    cursor: pointer;
  }

  .sidebar-listIcon {
    float: left;
    margin: 12px 5px;

    @include w_ml {
      float: left;
      margin: 0.5rem 1rem;
    }
  }
}
</style>