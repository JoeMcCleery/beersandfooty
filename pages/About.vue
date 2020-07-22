<template>
  <div>
    <div class="content">
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle">
        <h1 class="uk-text-center">About</h1>
      </div>
      <!--  Page Content Container  -->
      <section class="uk-section">
        <div class="uk-container">
          <p>
            <b>How to use:</b>
            Create an account and login to start writing reviews. Initially an
            Admin will need to publish any reviews you write for it to be
            visible to the public.
          </p>
          <p>
            <b>Tech info:</b>
            The frontend of this website is running nuxt in universal mode.
            There is also a Laravel API used to handle data storage and
            manipulation.
          </p>
          <a
            href="mailto:contact@beersandfooty.com?subject=Feedback"
            class="uk-button uk-button-secondary"
            >contact@beersandfooty.com</a
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  transition(to, from) {
    if (from && (from.name === 'Account-id' || from.name === 'Review-id')) {
      return 'page'
    }
    if (to.name === 'Account') {
      return 'slide-left'
    }
  }
}
</script>
