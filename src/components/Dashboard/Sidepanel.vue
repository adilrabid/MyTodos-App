<template>
  <div class="sidePanel">
    <div class="appName">
      <p>The ultimate todolist</p>
    </div>
    <div class="userProfile">
      <div class="userMeta">
        <p class="userMetaName">Adil Rabid</p>
        <p class="userMetaEmail">rabid1234@gmail.com</p>
      </div>
    </div>
    <div class="listOption listOption-myday">
      <p>My Day</p>
      <span>{{ todoCount }}</span>
    </div>
    <div class="listOption listOption-important">
      <p>Important</p>
      <span>{{ todoCount }}</span>
    </div>
    <div class="listOption listOption-tasks">
      <p>Tasks</p>
      <span>{{ todoCount }}</span>
    </div>
    <div class="listOption listOption-completed">
      <p>Completed</p>
      <span>{{ todoCount }}</span>
    </div>
    <div class="listOption listOption-due">
      <p>Due</p>
      <span>{{ todoCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { todoCount: 5 };
  },
};
</script>

<style scoped>
.sidePanel {
  width: 40%;
  padding: 10px 0px;
}

.appName p {
  margin: 0px;
  padding: 5px 20px;
  font-size: 14px;
}
.userProfile {
  display: flex;
  align-items: center;
  padding: 12px 20px;
}

.userProfilePic {
  margin-right: 15px;
  border-radius: 50%;
}
.userMetaName {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px 0;
}
.userMetaEmail {
  font-size: 12px;
  font-weight: 100;
  margin: 0;
}
.listOption {
  transition: 200ms;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
}
.listOption:hover {
  background-color: rgb(245, 245, 245);
}
.listOption p {
  margin: 0;
  font-size: 16px;
}
.listOption-myday {
  color: green;
}
.listOption-important {
  color: rgb(255, 149, 167);
}
.listOption-tasks {
  color: purple;
}
.listOption-completed {
  color: orange;
}
.listOption-due {
  color: crimson;
}
</style>