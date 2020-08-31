<template>
  <div class="settings-wrap">
    <div @click="$store.state.settingsClicked = false" class="sidePanel_hide">
      <i class="fas fa-chevron-right"></i>
    </div>
    <div class="settings">
      <div class="settings-head">
        <div>
          <h2 class="settings-title">
            <i class="fas fa-cog"></i>
            Settings
          </h2>
        </div>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          <i class="fas fa-user"></i>
          Username :
          <input v-model="username" type="text" class="settings-username" />
        </label>
      </div>
      <div class="settings-option">
        <label class="settings-label cursorPointer settings-profilePic-hover">
          <i class="fas fa-user-circle"></i>
          Profile Picture :
          <br />
          <input
            @change="changeProfilePic"
            type="file"
            accept=".png, .jpg, .jpeg"
            class="settings-profilePic-main"
          />
          <div class="settings-profilePic-container" title="Change Picture">
            <img :src="profilePic" alt="Select an image" class="settings-profilePic" />
            <div class="settings-profilePic-editLogo">
              <i class="fas fa-edit"></i>
            </div>
          </div>
        </label>
        <transition name="fade">
          <div v-if="selectedPPError" class="selectedPPError">{{selectedPPError}}</div>
        </transition>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          <i class="fas fa-image"></i> Background Image :
        </label>
        <div class="settings-backgroundImage">
          <div v-for="(img, index) in image" :key="index" title="Select Background Image">
            <img :src="img" @click="changeBg(img)" class="settings-backgroundImage-option" />
          </div>
        </div>
      </div>
      <div class="settings-option">
        <label class="settings-label">
          <i class="fas fa-adjust"></i> Color Scheme :
          <select v-model="theme" class="settings-colorScheme">
            <option disabled value>Select theme</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div class="place-bottom width-adaptive">
        <div class="settings-option">
          <button @click="saveSettings" class="btn btn-update" style="marginBottom: -10px">
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
      selectedPPError: null,
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
    // selectedPPError(value) {
    //   if (value) {
    //     setTimeout(() => {
    //       this.selectedPPError = null;
    //     }, 4000);
    //   }
    // },
    theme(value) {
      this.$store.state.theme = value;
    },
  },
  methods: {
    saveSettings() {
      this.$store.state.userData.username = this.username;
      this.$store.state.userData.theme = this.theme;
      this.$store.state.userData.bgUrl = this.bgUrl;
      this.$store.state.userData.profilePic = this.profilePic;
      this.$store.dispatch("saveSettings", this.$store.state.userData);
    },
    changeProfilePic(event) {
      this.selectedPP = event.target.files[0];
      if (this.selectedPP.size > 1000000) {
        this.selectedPPError = "Please select an image smaller than 1 MB";
        this.selectedPP = null;
        return;
      }
      this.selectedPPError = null;
      ImageReader.addEventListener("load", () => {
        this.profilePic = ImageReader.result;
      });
      ImageReader.readAsDataURL(this.selectedPP);
      //this.$store.dispatch("uploadProfilePic", this.selectedPP);
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
    this.profilePic = this.$store.getters.userData.profilePic;
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
  z-index: 0;
}

.settings-profilePic-container {
  z-index: 1;
  margin-top: 10px;
  height: 60px;
  width: 60px;

  /* background-color: blanchedalmond; */
  display: flex;
  position: relative;
}
.settings-profilePic-editLogo {
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  transition: all 100ms;
}
.settings-profilePic-hover:hover .settings-profilePic-editLogo {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.748);
  backdrop-filter: blur(1px);
  color: lightgray;
}
.selectedPPError {
  font-size: 12px;
  color: brown;
  margin-top: -5px;
  margin-bottom: -10px;
}
.btn-update {
  margin-bottom: 0;
  margin-top: 10px;
}
.btn-delete {
  margin-top: 10px;
}
</style>
