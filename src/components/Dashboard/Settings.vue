<template>
  <div class="settings-wrap">
    <div class="settings">
      <div class="settings-head">
        <div>
          <h2 class="settings-title">
            <i class="fas fa-tools"></i>
            Settings
          </h2>
        </div>
        <div class="close-settings-wrap" @click="$store.state.settingsClicked = false">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          <i class="fas fa-user"></i>
          Username:
          <input v-model="username" type="text" class="settings-username" />
        </label>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          <i class="fas fa-user-circle"></i>
          Profile Picture :
          <br />
          <input
            @change="changeProfilePic"
            type="file"
            accept=".png, .jpg, .jpeg"
            class="settings-profilePic-main"
          />
          <img :src="profilePic" alt="Select an image" class="settings-profilePic" />
        </label>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          <i class="fas fa-image"></i> Background Image:
        </label>
        <div class="settings-backgroundImage">
          <div v-for="(img, index) in image" :key="index">
            <img :src="img" @click="changeBg(img)" class="settings-backgroundImage-option" />
          </div>
        </div>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          <i class="fas fa-adjust"></i> Color Scheme:
          <select v-model="theme" class="settings-colorScheme">
            <option disabled value>Select theme</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div class="place-bottom width-adaptive">
        <div class="settings-option">
          <button @click="saveSettings" class="btn btn-update">
            <i class="fas fa-cloud-upload-alt"></i>
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
import defaultProfilePic from "../../assets/user.png";
export default {
  data() {
    return {
      pp: defaultProfilePic,
      username: "",
      theme: "",
      bgUrl: "",
      selectedPP: "",
    };
  },
  computed: {
    image() {
      return this.$store.state.BG;
    },
    profilePic: {
      get() {
        return this.pp;
      },
      set(newValue) {
        this.pp = newValue;
      },
    },
  },
  watch: {
    theme(value) {
      this.$store.state.theme = value;
    },
  },
  methods: {
    saveSettings() {
      console.log("inside saveSettings : ", this.profilePic);
      this.$store.state.userData.username = this.username;
      this.$store.state.userData.theme = this.theme;
      this.$store.state.userData.bgUrl = this.bgUrl;
      this.$store.state.userData.profilePic = this.profilePic;
      this.$store.dispatch("saveSettings", this.$store.state.userData);
    },
    changeProfilePic(event) {
      this.selectedPP = event.target.files[0];
      ImageReader.onload = function () {
        this.profilePic = ImageReader.result;
        console.log("inside updateProfilePic : ", this.profilePic);
      };
      ImageReader.readAsDataURL(this.selectedPP);
    },
    changeBg(url) {
      this.bgUrl = url;
      this.$store.commit("setBG", url);
    },
  },
  created() {
    this.username = this.$store.state.userData.username;
    this.bgUrl = this.$store.state.userData.bgUrl;
    this.theme = this.$store.getters.userData.theme;
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
