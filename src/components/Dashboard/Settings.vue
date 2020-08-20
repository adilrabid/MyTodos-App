<template>
  <div class="settings-wrap">
    <div class="settings">
      <div class="settings-head">
        <div>
          <h2 class="settings-title">Settings</h2>
        </div>
        <div class="close-settings-wrap" @click="$store.state.settingsClicked = false">
          <span class="close-settings"></span>
        </div>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          Username:
          <input v-model="username" type="text" class="settings-username" />
        </label>
      </div>

      <div class="settings-option">
        <label class="settings-label">
          Profile Picture :
          <br />
          <input
            @change="updateProfPic"
            type="file"
            accept=".png, .jpg, .jpeg"
            class="settings-profilePic-main"
          />
          <img :src="profilePic" alt="Select an image" class="settings-profilePic" />
        </label>
      </div>

      <div class="settings-option">
        <label class="settings-label">Background Image:</label>
        <div class="settings-backgroundImage">
          <div v-for="(img,index) in image" :key="index">
            <img :src="img" @click="changeBg(img)" class="settings-backgroundImage-option" />
          </div>
        </div>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          Color Scheme:
          <select v-model="theme" class="settings-colorScheme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      {{theme}}
      <div class="place-bottom width-adaptive">
        <div class="settings-option">
          <button @click="saveSettings" class="btn btn-update">
            <p>Save Changes</p>
          </button>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import { ImageReader } from "../../main.js";
export default {
  data() {
    return {
      username: "",
      theme: "",
      bgUrl: "",
      selectedPP: "",
      profilePic: "",
    };
  },
  computed: {
    image() {
      return this.$store.state.BG;
    },
  },
  methods: {
    updateProfPic(event) {
      this.selectedPP = event.target.files[0];
      ImageReader.onload = function () {
        this.profilePic = ImageReader.result;
      };
      console.log("inside updateProfilePic : ", this.profilePic);
      ImageReader.readAsDataURL(this.selectedPP);
    },
    changeBg(url) {
      this.bgUrl = url;
      this.$store.commit("setBG", url);
    },
    saveSettings() {
      console.log("inside saveSettings : ", this.profilePic);
      this.$store.state.userData.username = this.username;
      this.$store.state.userData.theme = this.theme;
      this.$store.state.userData.bgUrl = this.bgUrl;
      this.$store.state.userData.profilePic = this.profilePic;
      this.$store.dispatch("saveSettings", this.$store.state.userData);
    },
  },
  created() {
    this.username = this.$store.state.userData.username;
    this.theme = this.$store.state.userData.theme;
    this.bgUrl = this.$store.state.userData.bgUrl;
  },
};
</script>
<style>
.settings-profilePic-main {
  display: none;
}
.settings-profilePic {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin: 10px 0px 0px;
}
.settings-profilePic:hover {
  cursor: pointer;
}
</style>