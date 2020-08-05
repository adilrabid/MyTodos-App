<template>
  <div class="todoDetails-wrap">
    <div class="todoDetails">
      <div class="todoDetails-head">
        <div>
          <h2 class="todoDetails-title">Title : {{ todo.name }}</h2>
          <p class="todoDetails-dataCreated">Created on : {{ todo.dataCreated }}</p>
        </div>
        <button class="close-btn" @click="hideDetails">+</button>
      </div>
      <div class="todoDetails-option">
        <label for>Add note</label>
        <br />
        <textarea class="todoDetails-addNote" rows="3">
            Here is some note
        </textarea>
      </div>
      <div class="todoDetails-option">
        <label for>Add due data</label>
        <br />
        <input type="date" name id />
      </div>
      <div class="todoDetails-option">
        <p>Delete</p>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";
export default {
  data() {
    return {
      todo: {
        type: Object,
      },
      title: "hello world",
      dataCreated: "",
    };
  },
  methods: {
    // hideDetails(event) {
    //   const todoDetailsElement = document.querySelector(".todoDetails");
    //   if (event.target != todoDetailsElement) {
    //     this.$emit("hideDetails");
    //   }
    // },
    hideDetails() {
      this.$emit("hideDetails");
    },
  },
  created() {
    eventBus.$on("sendData", (data) => {
      this.todo = data;
      console.log("Type of Data : " + typeof data);
      console.log("Type of this.todo : " + typeof this.todo);
      console.log(this.todo);
    });
  },
};
</script>

<style scoped>
.todoDetails-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.349);
}
.todoDetails {
  height: 100%;
  width: 400px;
  background-color: rgb(245, 245, 245);
  float: right;
}
.todoDetails-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.todoDetails-title {
  margin: 0px;
  padding: 15px 40px 10px;
}
.todoDetails-dataCreated {
  padding: 15px 40px 10px;
}
.close-btn {
  margin-top: 10px;
  margin-right: 20px;
  font-size: 40px;
}
.todoDetails-option {
  background-color: #fff;
  padding: 10px 20px;
  margin: 10px 20px;
}
.todoDetails-addNote {
  width: 100%;
  padding: 10px 0px;
  font-size: 18px;
  outline: none;
  border: none;
}
</style>