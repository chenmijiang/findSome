<template>
  <div class="engine-select-box">
    <div class="engine-select-content">
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import '../assets/defineValue';
@import '../assets/device';

div.engine-select-box {
    $select-box-height: 60px;
    width: 300px;
    height: $select-box-height;
    border: 1px solid $base-line-color;
    border-radius: 12px;
    background-color: $base-box-bg;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: none;

    @include w_ml {
      top: 60%;
    }

    .engine-select-content {
        display: flex;
        line-height: $select-box-height;
        height: 100%;
    }

    .engine-item {
        margin: 0 10px;
        cursor: pointer;
    }
}

div.engine-select-box.active {
    display: block;
}
</style>