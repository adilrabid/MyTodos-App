<template>
  <div class="tnc-wrap">
    <div class="tnc-box">
      <div class="tnc-head">
        <h3 class="tnc-title">Terms and Conditions</h3>
        <button class="close-btn" @click="hideTnc">+</button>
      </div>
      <p class="tnc-last-updated">Last updated: (July 29, 2020)</p>
      <div class="tnc-content">
        <p>
          Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the http://www.mywebsite.com (change this) website and the My Mobile App (change this) mobile application (the "Service") operated by My Company (change this) ("us", "we", or "our").
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </p>
        <h6>Purchases</h6>
        <p>
          If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your …
          The Purchases section is for businesses that sell online (physical or digital). For the full disclosure section, create your own Terms and Conditions.
        </p>
        <h6>Subscriptions</h6>
        <p>
          Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring ...
          The Subscriptions section is for SaaS businesses. For the full disclosure section, create your own Terms and Conditions.
        </p>
        <h6>Content</h6>

        <p>
          Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the …
          The Content section is for businesses that allow users to create, edit, share, make content on their websites or apps. For the full disclosure section, create your own Terms and Conditions.
        </p>
        <h6>Links To Other Web Sites</h6>
        <p>
          Our Service may contain links to third-party web sites or services that are not owned or controlled by My Company (change this).
          My Company (change this) has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that My Company (change this) shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
        </p>
        <h6>Changes</h6>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 (change this) days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        <h6>Contact Us</h6>
        <p>If you have any questions about these Terms, please contact us.</p>
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
  max-height: 80vh;
  max-width: 80vw;
  padding: 40px;

  background-color: #fff;
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
}
.tnc-last-updated {
  margin: 10px 0px;
}
.tnc-content {
  border: 0.5px solid lightgrey;
  padding: 10px;
  max-height: 300px;
  overflow: auto;
}
</style>