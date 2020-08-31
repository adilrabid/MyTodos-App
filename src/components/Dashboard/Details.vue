<template>
  <!----------------------------------- List Details ------------------------------------>

  <div class="todoDetails-wrap">
    <div @click="$store.state.todoClicked = false" class="sidePanel_hide">
      <i class="fas fa-chevron-right"></i>
    </div>
    <div class="todoDetails">
      <div class="todoDetails-head">
        <div>
          <input v-model="todo.title" type="text" class="todoDetails-title" />
        </div>
      </div>
      <div class="todoDetails-option">
        <p class="created-on">
          <i class="far fa-clock"></i>
          Created on : {{ todoCalcData_dateCreated.date }} at
          {{ todoCalcData_dateCreated.time }}
        </p>
      </div>
      <div class="todoDetails-option">
        <label class="todoDetails-label">
          <i class="far fa-clipboard"></i>
          Note :
        </label>
        <textarea v-model="todo.note" class="todoDetails-note" rows="4" placeholder="Add note..."></textarea>
      </div>
      <div class="todoDetails-option">
        <label class="todoDetails-label">Status : {{ todo.status }}</label>
      </div>
      <div class="todoDetails-option todoDetails-dueDatePicker">
        <label class="todoDetails-label">
          <i class="far fa-calendar-times"></i>
          Due date : {{ todoCalcData_dueDate.date }} at
          {{ todoCalcData_dueDate.time }}
        </label>
        <transition name="dueDatePicker" mode="out-in">
          <button v-if="!dueDatePicker" @click="dueDatePicker = true" class="dueDatePicker-edit">
            <i class="fas fa-pencil-alt"></i>
            Edit
          </button>
          <form @submit.prevent v-else class="dueDatePicker-wrap">
            <label for="datePicker" class="todoDetails-label">Date:</label>
            <input lazy type="date" id="datePicker" class="dueDatePicker" v-model="date" />
            <br />
            <label for="timePicker" class="todoDetails-label">Time:</label>
            <input lazy type="time" id="timePicker" class="dueDatePicker" v-model="time" />
            <br />
            <button
              @click="dueDatePicker = false"
              type="submit"
              class="dueDatePicker-btn dueDatePicker-ok"
            >
              <i class="fas fa-check"></i>
              Ok
            </button>
            <button @click="dueDatePickCancel()" class="dueDatePicker-btn dueDatePicker-cancel">
              <i class="fas fa-times"></i>
              Cancel
            </button>
          </form>
        </transition>
      </div>
      <div class="place-bottom width-adaptive">
        <div class="todoDetails-option">
          <button @click="updateTodo" class="btn btn-update">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Update</p>
          </button>
          <button @click="deleteTodo" class="btn btn-delete">
            <i class="far fa-trash-alt"></i>
            <p>Delete</p>
          </button>
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
        completed: "",
        important: "",
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
      this.$store.dispatch("deleteTodo");
    },
    updateTodo() {
      let convertToMS = new Date(this.todo.dueDate);
      this.todo.dueDate = convertToMS.getTime();
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
    this.todo.dateCreated = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].dateCreated;
    this.todo.note = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].note;
    this.todo.completed = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].completed;
    this.todo.important = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].important;
    this.todo.status = this.$store.getters.getStoredTodos[
      this.$store.state.clickedTodoIndex
    ].status;
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
  transition: padding 200ms;
  border-radius: 5px;
  color: inherit;
  font-weight: 600;
  width: 90%;
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
  font-family: inherit;
  transition: padding 200ms;
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
.dueDatePicker-edit,
.dueDatePicker-ok {
  background-color: #2979ff;
  color: white !important;
}
.dueDatePicker-edit:hover,
.dueDatePicker-ok:hover {
  background-color: dodgerblue;
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
  color: inherit;
  width: 100%;
  padding: 10px 20px;
  transition: 200ms;
  margin-bottom: 10px;
  outline: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  border: none;
  cursor: pointer;
  background-color: rgba(238, 238, 238, 0.6);
}
.btn:hover {
  background-color: rgba(182, 182, 182, 0.211);
}
.btn svg {
  margin-right: 18px;
}
.btn-delete:hover {
  color: #e60023;
}
.btn-update:hover {
  color: #009578;
}
</style>
