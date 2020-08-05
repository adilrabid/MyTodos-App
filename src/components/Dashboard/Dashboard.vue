<template>
  <div class="dashboard">
    <Sidepanel></Sidepanel>
    <Lists></Lists>
    <transition name="Popup">
      <Details @hideDetails="hideDetails" v-if="todoClicked"></Details>
    </transition>
  </div>
</template>

<script>
import Sidepanel from "./Sidepanel";
import Details from "./Details";
import Lists from "./Lists";
import { eventBus } from "../../main.js";
export default {
  components: { Sidepanel, Details, Lists },
  data() {
    return {
      todoClicked: false,
      image: "../assets/logo.png",
      bgUrl: "",
    };
  },
  methods: {
    hideDetails() {
      this.todoClicked = false;
    },
  },
  created() {
    eventBus.$on("showDetails", (todoIndex) => {
      this.todoClicked = true;
      console.log(todoIndex);
    });
  },
};
</script>

<style>
.dashboard {
  display: flex;
  height: 100vh;
  width: 100%;
}
.sidePanel,
.allLists {
  height: 100%;
}
</style>