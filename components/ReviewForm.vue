<template>
  <div class="review-form">
    <form
      v-if="!$store.state.authUser"
      class="uk-background-default"
      @submit.prevent="createReview"
    >
      <button
        class="uk-modal-close-default uk-close-large"
        type="button"
        uk-close
      ></button>
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
              v-model.lazy="review.title"
              name="title"
              title="title"
              type="text"
              class="uk-input uk-width-expand"
            />
          </div>
        </div>

        <div class="uk-margin uk-hidden">
          <div class="uk-inline uk-width-1-1">
            <label for="publishDate">Publish Date</label>
            <input
              id="publishDate"
              v-model.lazy="review.publish_date"
              name="title"
              title="title"
              type="text"
              class="uk-input uk-width-expand"
            />
          </div>
        </div>

        <div>
          <label for="typeBeer">
            <input
              id="typeBeer"
              v-model.lazy="review.type"
              name="typeBeer"
              title="typeBeer"
              type="radio"
              class="uk-radio"
              value="beer"
            />
            Beer Review</label
          >
        </div>

        <div>
          <label for="typeFooty">
            <input
              id="typeFooty"
              v-model.lazy="review.type"
              name="typeFooty"
              title="typeFooty"
              type="radio"
              class="uk-radio"
              value="footy"
            />
            Footy Review</label
          >
        </div>

        <div class="uk-margin-small">
          <button
            name="addBlock"
            title="addBlock"
            type="button"
            class="uk-button uk-button-primary uk-button-small"
            @click="addBlock(sortedContentBlocks.length)"
          >
            Add Block
          </button>
        </div>

        <div class="blocks uk-grid-stack uk-grid-medium" uk-grid>
          <div
            v-for="(block, idx) in sortedContentBlocks"
            :key="encodeURI(idx + block.type + block.sort)"
            class="uk-width-1-1"
          >
            <div
              class="uk-animation-fade uk-background-default uk-position-relative"
            >
              <hr />
              <div class="uk-margin-small">
                <a
                  id="removeBlock"
                  name="removeBlock"
                  title="Trash Block"
                  type="button"
                  class="uk-icon-link uk-float-right uk-margin-right"
                  @click="removeBlock(idx)"
                >
                  <span uk-icon="icon: trash" />
                </a>
              </div>
              <div class="uk-margin-small">
                {{ block.sort }}
                <button
                  :class="{ 'uk-hidden': block.sort <= 0 }"
                  name="blockIndexUp"
                  title="blockIndexUp"
                  type="button"
                  class="uk-button uk-button-default uk-button-small"
                  @click="moveBlock(idx, idx - 1)"
                >
                  <span uk-icon="icon: chevron-up" />
                </button>
                <button
                  :class="{
                    'uk-hidden': block.sort >= sortedContentBlocks.length - 1
                  }"
                  name="blockIndexDown"
                  title="blockIndexDown"
                  type="button"
                  class="uk-button uk-button-default uk-button-small"
                  @click="moveBlock(idx, idx + 1)"
                >
                  <span uk-icon="icon: chevron-down" />
                </button>
              </div>
              <div class="uk-margin-small">
                <select
                  v-model.lazy="block.type"
                  name="type"
                  class="uk-select uk-width-small uk-form-small"
                >
                  <option value="long_text">Long Text</option>
                  <option value="short_text">Short Text</option>
                  <option value="score">Score</option>
                  <option value="image">Image</option>
                </select>
              </div>

              <div>
                <textarea
                  v-if="['long_text'].some((v) => block.type === v)"
                  v-model.lazy="block.content"
                  name="content"
                  title="content"
                  type="text"
                  class="uk-textarea uk-width-1-1"
                />
                <input
                  v-if="['short_text'].some((v) => block.type === v)"
                  v-model.lazy="block.content"
                  name="content"
                  title="content"
                  type="text"
                  class="uk-input uk-width-expand"
                />
                <input
                  v-if="['score'].some((v) => block.type === v)"
                  v-model.lazy="block.content"
                  name="content"
                  title="content"
                  type="number"
                  max="100"
                  min="0"
                  class="uk-input uk-form-width-small uk-text-right"
                />
                <span
                  v-if="['score'].some((v) => block.type === v)"
                  class="uk-inline"
                >
                  / 100
                </span>
              </div>
            </div>
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
              v-model.lazy="showPreview"
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
      <review :review="review" />
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
        publish_date: this.getTimestamp(),
        content_blocks: [
          {
            sort: 0,
            type: 'long_text',
            content: 'new block'
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
    sortedContentBlocks() {
      const blocks = this.review.content_blocks
      return blocks.sort((a, b) => (a.sort <= b.sort ? -1 : 1))
    }
  },
  methods: {
    createReview(e) {},
    addBlock(
      idx,
      block = {
        sort: 0,
        type: 'long_text',
        content: 'new block'
      }
    ) {
      block.sort = idx
      this.review.content_blocks.splice(idx, 0, block)
      for (let i = idx; i < this.review.content_blocks.length; i++) {
        this.review.content_blocks[i].sort = i
      }
    },
    removeBlock(idx) {
      this.review.content_blocks.splice(idx, 1)
      for (let i = idx; i < this.review.content_blocks.length; i++) {
        this.review.content_blocks[i].sort = i
      }
    },
    moveBlock(fromIndex, toIndex) {
      const element = this.review.content_blocks[fromIndex]
      this.removeBlock(fromIndex)
      this.addBlock(toIndex, element)
    },
    getTimestamp() {
      return parseInt(new Date().getTime() / 1000)
    }
  }
}
</script>
