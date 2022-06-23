<template>
  <Switch></Switch>
  <Search></Search>
  <EngineSelector></EngineSelector>
</template>

<script>
import Switch from "./components/Switch.vue"
import Search from "./components/Search.vue"
import EngineSelector from "./components/EngineSelect.vue"

export default {
  name: "App",
  components: {
    Switch,
    Search,
    EngineSelector
  },
};
</script>
<style lang="scss">
</style>