<template>
  <div class="tnc-wrap">
    <div class="tnc-box">
      <div class="tnc-head">
        <h3 class="tnc-title">Terms and Conditions</h3>
        <button class="close-btn" @click="hideTnc">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <p class="tnc-last-updated">Last updated: (Augast 30, 2020)</p>
      <div class="tnc-content">
        <p>
          Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Mytodos website operated by Adil Rabid.
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Mytodos.
          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </p>
        <h6>Purchases</h6>
        <p>Our service dosen't require any purchases.</p>
        <h6>Subscriptions</h6>
        <p>Our subscription is totally free for life time.</p>
        <h6>Content</h6>
        <p>
          First of all, this is a portfolio project and this website is still in test mode. Our Service allows you to post new todo, edit their data, checking as completed, important and also adding due date. You are responsible for the
          The Content section is for businesses that allow users to create, edit, share, make content on their websites or apps.
          <strong>Please do not put your other social media account's credentials while signing up.</strong> If anyhow you account credentials is leaked, we won't be responsible for that.
        </p>
        <h6>Links To Other Websites</h6>
        <p>Till now our service is not linked to any other third party websites or apps. But in future there may have some externel links.</p>
        <h6>Changes</h6>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 7 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        <h6>Contact Us</h6>
        <p>If you have any questions about these Terms, please contact to :</p>
        <ul class="tnc-links-ul">
          <li>
            <i class="fas fa-envelope"></i>
            <a href="mailto:rabid1819@gmail.com">rabid1819@gmail.com</a>
          </li>
          <li>
            <i class="fab fa-facebook-square"></i>
            <a href="#">Adil Rabid</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hideTnc() {
      this.$emit("hideTnc", false);
    },
  },
};
</script>

<style scoped>
.tnc-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.637);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tnc-box {
  max-height: 80%;
  max-width: 80%;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
}
.tnc-box p {
  font-size: 14px;
}
.tnc-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tnc-title {
  margin: 0;
  font-weight: normal;
}
.tnc-last-updated {
  margin: 10px 0px;
}
.tnc-content {
  border: 0.5px solid lightgrey;
  padding: 10px;
  max-height: 300px;
  overflow: auto;
  border-radius: 5px;
}
.tnc-content h6 {
  margin: 20px 0px 10px;
}
.tnc-links-ul {
  list-style: none;
  padding: 0;
}
.tnc-links-ul li {
  font-size: 14px;
}
.tnc-links-ul li svg {
  margin-right: 10px;
}
.tnc-links-ul li a {
  text-decoration: none;
}
</style>