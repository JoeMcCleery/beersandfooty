<template>
  <div id="delete-review-modal" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <p class="uk-text-center">
        Are you sure you want to delete this review?
      </p>
      <div
        v-if="editReview"
        class="uk-grid-small uk-flex uk-flex-center"
        uk-grid
      >
        <div>
          <a class="uk-button uk-button-danger" @click="deleteReview()">
            Delete
          </a>
        </div>
        <div>
          <a
            class="uk-button uk-button-default"
            href="#delete-review-modal"
            uk-toggle
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmReviewDeletionModal',
  computed: {
    editReview() {
      return this.$store.getters.getEditReview
    }
  },
  methods: {
    deleteReview() {
      const reviewID = this.editReview.id
      if (reviewID) {
        this.$store.dispatch('deleteReview', {
          id: reviewID
        })
        window.location.reload(true)
      }
    }
  }
}
</script>
