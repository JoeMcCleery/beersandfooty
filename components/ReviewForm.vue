<template>
  <div class="review-form">
    <form
      v-if="!$store.state.authUser"
      class="uk-background-default"
      @submit.prevent="createReview"
    >
      <div class="uk-modal-header">
        <h2 class="uk-modal-title">Create Review</h2>
      </div>
      <div class="uk-modal-body">
        <div v-if="formError" class="uk-alert-danger" uk-alert>
          <p>{{ formError }}</p>
        </div>

        <div class="uk-margin">
          <div class="uk-inline uk-width-1-1">
            <label for="title">Title</label>
            <input
              id="title"
              v-model="review.title"
              name="title"
              title="title"
              type="text"
              class="uk-input uk-width-expand"
            />
          </div>
        </div>

        <div class="uk-margin">
          <div class="uk-float-left">
            <label for="typeBeer">
              <input
                id="typeBeer"
                v-model="review.type"
                name="typeBeer"
                title="typeBeer"
                type="radio"
                class="uk-radio"
                value="beer"
              />
              Beer Review</label
            >
          </div>

          <div class="uk-float-right">
            <label for="typeFooty">
              <input
                id="typeFooty"
                v-model="review.type"
                name="typeFooty"
                title="typeFooty"
                type="radio"
                class="uk-radio"
                value="footy"
              />
              Footy Review</label
            >
          </div>
        </div>
      </div>

      <div
        class="uk-modal-footer uk-text-right uk-flex uk-flex-middle uk-flex-row"
      >
        <div class="uk-width-expand uk-text-left">
          <label for="showPreview">
            <input
              id="showPreview"
              v-model="showPreview"
              name="showPreview"
              title="showPreview"
              type="checkbox"
              class="uk-checkbox"
            />
            Show Preview
          </label>
        </div>
        <button
          class="uk-button uk-button-primary"
          type="submit"
          name="create"
          value="true"
        >
          Create
        </button>
      </div>
    </form>

    <!--  preview  -->
    <div
      v-if="showPreview"
      class="uk-animation-slide-top-small uk-padding uk-padding-remove-horizontal"
    >
      <review :review="reviewWithDate" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewForm',
  components: { Review: () => import('~/components/Review.vue') },
  data() {
    return {
      formError: null,
      showPreview: false,
      review: {
        id: 0,
        title: '',
        type: 'beer',
        publish_date: 0,
        content_blocks: [
          {
            type: 'long_text',
            content: 'test'
          }
        ],
        votes: [
          {
            downvotes: 1,
            upvotes: 0
          }
        ],
        created_at: 0,
        updated_at: 0,
        deleted_at: 0
      }
    }
  },
  computed: {
    reviewWithDate() {
      const data = this.review
      data.publish_date = new Date().getTime() / 1000
      return data
    }
  },
  methods: {
    createReview(e) {}
  }
}
</script>
