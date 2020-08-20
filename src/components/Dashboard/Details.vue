<template>
  <!----------------------------------- List Details ------------------------------------>

  <div class="todoDetails-wrap">
    <div class="todoDetails">
      <div class="todoDetails-head">
        <div>
          <input v-model="todo.title" type="text" class="todoDetails-title" />
        </div>
        <div class="close-todoDetails-wrap">
          <span class="close-todoDetails" @click="$store.state.todoClicked = false"></span>
        </div>
      </div>
      <div class="todoDetails-option">
        <p class="created-on">
          Created on: {{ todoCalcData_dateCreated.date }} at
          {{ todoCalcData_dateCreated.time }}
        </p>
      </div>
      <div class="todoDetails-option">
        <label class="todoDetails-label">Note:</label>
        <textarea v-model="todo.note" class="todoDetails-note" rows="3" placeholder="Add note..."></textarea>
      </div>
      <div class="todoDetails-option">
        <label class="todoDetails-label">Status: {{ todo.status }}</label>
      </div>
      <!-- <div>
        {{date}} {{time}}
        <br />
        Only date: {{todoCalcData_due_OnlyDate}}
        <br />
        Only time: {{todoCalcData_due_OnlyTime}}
      </div>-->
      <div class="todoDetails-option todoDetails-dueDatePicker">
        <label
          class="todoDetails-label"
        >Due data: {{ todoCalcData_dueDate.date }} at {{ todoCalcData_dueDate.time }}</label>
        <transition name="dueDatePicker" mode="out-in">
          <button v-if="!dueDatePicker" @click="dueDatePicker=true" class="dueDatePicker-edit">Edit</button>
          <form @submit.prevent v-else class="dueDatePicker-wrap">
            <label for="datePicker" class="todoDetails-label">Date:</label>
            <input lazy type="date" id="datePicker" class="dueDatePicker" v-model="date" />
            <br />
            <label for="timePicker" class="todoDetails-label">Time:</label>
            <input lazy type="time" id="timePicker" class="dueDatePicker" v-model="time" />
            <br />
            <button @click="dueDatePicker=false" type="submit" class="dueDatePicker-btn ok">Ok</button>
            <button @click="dueDatePickCancel()" class="dueDatePicker-btn cancel">Cancel</button>
          </form>
        </transition>
      </div>

      <div class="place-bottom width-adaptive">
        <div class="todoDetails-option">
          <button @click="updateTodo" class="btn btn-update">
            <p>Update</p>
          </button>
          <br />
          <br />
          <button @click="deleteTodo" class="btn btn-delete">
            <p>Delete</p>
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dueDatePicker: false,

      date: "",
      time: "",

      todo: {
        title: "",
        dateCreated: "",
        dueDate: "",
        note: "",
        status: "",
        category: "",
      },
    };
  },
  computed: {
    pickedDateAndTime() {
      return this.date + "T" + this.time;
    },
    todoCalcData_dateCreated() {
      return this.$store.getters.dateTimeString_dateCreated;
    },
    todoCalcData_dueDate() {
      return this.$store.getters.dateTimeString_dueDate;
    },
    todoCalcData_due_OnlyDate() {
      return this.$store.getters.dateTimeString_dueDate.onlyDate;
    },
    todoCalcData_due_OnlyTime() {
      return this.$store.getters.dateTimeString_dueDate.onlyTime;
    },
  },
  watch: {
    pickedDateAndTime(newValue, oldValue) {
      if (newValue != oldValue) {
        this.todo.dueDate = this.pickedDateAndTime;
      }
    },
  },
  methods: {
    deleteTodo() {
      console.log("Delete occured");
      this.$store.dispatch("deleteTodo");
    },
    updateTodo() {
      console.log("Update clicked");
      this.$store.dispatch("updateTodo", this.todo);
    },
    dueDatePickCancel() {
      this.date = this.todoCalcData_due_OnlyDate;
      this.time = this.todoCalcData_due_OnlyTime;
      this.dueDatePicker = false;
    },
  },
  created() {
    this.todo.title = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].title;
    this.todo.note = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].note;
    this.todo.category = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].category;
    this.todo.status = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].completed
      ? "Completed"
      : "Incomplete";
    this.$store.commit(
      "msToActual_creationDate",
      this.$store.getters.getStoredTodos[this.$store.state.clickedTodoIndex]
        .dateCreated
    );
    this.$store.commit(
      "msToActual_dueDate",
      this.$store.getters.getStoredTodos[this.$store.state.clickedTodoIndex]
        .dueDate
    );
    this.date = this.todoCalcData_due_OnlyDate;
    this.time = this.todoCalcData_due_OnlyTime;
  },
};
</script>
<style>
.todoDetails-title {
  border: 0px;
  outline: none;
  transition: 200ms;
  border-radius: 5px;
}
.todoDetails-title:focus,
.todoDetails-title:hover {
  border: 0.1px solid lightgrey;
  padding: 3px 5px;
  outline: none;
}
.todoDetails-note {
  font-size: 15px;
  width: 100%;
  outline: none;
  border: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  transition: 300ms;
}
.todoDetails-note:focus,
.todoDetails-note:hover {
  border-radius: 5px;
  padding: 3px 5px;
  border: 0.1px solid lightgray;
}
.todoDetails-dueDatePicker .dueDatePicker-wrap {
  padding: 10px 0px;
}
.dueDatePicker-edit {
}
.dueDatePicker-btn {
  margin-right: 5px;
  margin-top: 15px;
}
.dueDatePicker-btn,
.dueDatePicker-edit {
  padding: 5px 0px;
  width: 70px;
  border: none;
  outline: none;
  border-radius: 3px;
  color: #2c3e50;
  font-weight: 600;
  cursor: pointer;
  transition: 100ms;
}
.dueDatePicker-btn:hover,
.dueDatePicker-edit:hover {
  background-color: rgb(231, 231, 231);
}
.dueDatePicker-btn.ok {
  /* color: #009578; */
}
.dueDatePicker-btn.cancel {
  /* color: crimson; */
}

.dueDatePicker-enter-active {
  transition: all 0.1s ease;
}
.dueDatePicker-leave-active {
  transition: all 0.1s;
}
.dueDatePicker-enter,
.dueDatePicker-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.todoDetails-dueDatePicker .dueDatePicker-wrap .todoDetails-label {
  display: inline;
}
.todoDetails-dueDatePicker .dueDatePicker-wrap #datePicker {
  margin-bottom: 10px;
}
.todoDetails-dueDatePicker .dueDatePicker {
  font-size: 15px;
  padding: 3px 12px;
  width: 160px;
  margin-left: 5px;
  border: 0.1px solid rgb(226, 226, 226);
  border-radius: 5px;
}
.todoDetails-dueDatePicker .dueDatePicker:focus {
  outline: none;
}

.btn {
  width: 100%;
  padding: 10px 0px;
  text-align: center;
  transition: 200ms;
  border-radius: 5px;
  background-color: #fff;
  outline: none;
}
.btn-delete {
  color: crimson;
  border: 0.5px solid crimson;
}
.btn-delete:hover {
  color: #fff;
  background-color: crimson;
}
.btn-update {
  color: #009578;
  border: 0.5px solid #009578;
}
.btn-update:hover {
  color: white;
  background-color: #009578;
}
</style>
