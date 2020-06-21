<template>
  <div
    class="review-form uk-grid uk-flex-center uk-flex-middle uk-margin-bottom uk-child-width-1-1 uk-child-width-1-2@m"
    uk-grid
  >
    <div class="uk-position-relative">
      <a href="#review-form-modal" class="uk-modal-close-default" uk-toggle>
        <span class="uk-icon-link uk-padding-xsmall" uk-icon="icon: close" />
      </a>
      <form
        v-if="loggedIn"
        class="uk-background-default"
        @submit.prevent="formAction"
      >
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">
            <span v-if="editReview">
              Edit Review
            </span>
            <span v-else>
              Create Review
            </span>
          </h2>
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
                required="required"
              />
            </div>
          </div>

          <div class="uk-margin uk-hidden">
            <div class="uk-inline uk-width-1-1">
              <label for="publishDate">Publish Date</label>
              <input
                id="publishDate"
                v-model="review.publish_date"
                name="title"
                title="title"
                type="text"
                class="uk-input uk-width-expand"
              />
            </div>
          </div>

          <div class="uk-margin">
            <div
              class="uk-grid-collapse uk-child-width-1-1 uk-text-center"
              uk-grid
            >
              <div>
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

              <div>
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
          <div class="blocks uk-grid-stack uk-grid-medium" uk-grid>
            <div
              v-for="(block, idx) in sortedContentBlocks"
              :key="encodeURI(idx + block.type + block.sort)"
              class="uk-width-1-1 uk-position-relative"
            >
              <hr />
              <div class="uk-animation-fade uk-background-default">
                <div class="uk-position-top-right uk-padding-small">
                  <a
                    id="removeBlock"
                    name="removeBlock"
                    title="Trash Block"
                    type="button"
                    class="uk-icon-link"
                    @click="removeBlock(idx)"
                  >
                    <span uk-icon="icon: trash" class="uk-padding-xsmall" />
                  </a>
                </div>
                <div class="uk-margin-small">
                  <div class="uk-inline">
                    <div>
                      <select
                        v-model="block.type"
                        name="type"
                        class="uk-select uk-form-width-small uk-form-small"
                      >
                        <option value="long_text">Long Text</option>
                        <option value="short_text">Short Text</option>
                        <option value="score">Score</option>
                        <option value="image">Image</option>
                      </select>
                    </div>
                  </div>
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

                <div>
                  <textarea
                    v-if="['long_text'].some((v) => block.type === v)"
                    v-model="block.content"
                    name="content"
                    title="content"
                    type="text"
                    class="uk-textarea uk-width-1-1"
                    placeholder="content here..."
                    required="required"
                  />
                  <input
                    v-if="['short_text'].some((v) => block.type === v)"
                    v-model="block.content"
                    name="content"
                    title="content"
                    type="text"
                    class="uk-input uk-width-expand uk-text-center"
                    placeholder="content here..."
                    required="required"
                  />
                  <div
                    v-if="['score'].some((v) => block.type === v)"
                    class="uk-text-center"
                  >
                    <input
                      v-model="block.content"
                      name="content"
                      title="content"
                      type="number"
                      max="100"
                      min="0"
                      class="uk-input uk-form-width-small"
                      placeholder="score..."
                      required="required"
                    />
                    <span
                      v-if="['score'].some((v) => block.type === v)"
                      class="uk-inline uk-text-center"
                    >
                      / 100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div
              class="uk-grid-small uk-child-width-auto uk-text-center"
              uk-grid
            >
              <div>
                <div>
                  <select
                    ref="newBlockType"
                    name="type"
                    class="uk-select uk-form-width-small uk-form-small"
                  >
                    <option value="long_text">Long Text</option>
                    <option value="short_text">Short Text</option>
                    <option value="score">Score</option>
                    <option value="image">Image</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <button
                    name="addBlock"
                    title="addBlock"
                    type="button"
                    class="uk-button uk-button-default uk-button-small"
                    @click="
                      addBlock(
                        sortedContentBlocks.length,
                        $refs.newBlockType.value
                      )
                    "
                  >
                    <span uk-icon="icon: plus; ratio: 0.5" />
                    Add Block
                  </button>
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
            <span v-if="editReview">
              Edit
            </span>
            <span v-else>
              Create
            </span>
          </button>
        </div>
      </form>
    </div>
    <!--  preview  -->
    <div v-if="showPreview">
      <div>
        <review :key="preview.title" :review="preview" />
      </div>
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
        user_id: this.user_id,
        author: '',
        title: '',
        type: 'beer',
        publish_date: this.getTimestamp(),
        content_blocks: [],
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
    },
    loggedIn() {
      return this.$store.state.userAccessToken && this.$store.state.user
    },
    editReview() {
      return this.$store.getters.getEditReview
    },
    user() {
      return this.$store.state.user
    },
    preview() {
      const previewData = JSON.parse(JSON.stringify(this.review))
      previewData.id = 0
      return previewData
    }
  },
  watch: {
    editReview() {
      if (this.editReview) {
        this.review = JSON.parse(
          JSON.stringify(this.$store.getters.getEditReview)
        )
      } else {
        this.review = {
          id: 0,
          user_id: 0,
          author: '',
          title: '',
          type: 'beer',
          publish_date: this.getTimestamp(),
          content_blocks: [],
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
      this.formError = ''
    }
  },
  methods: {
    async formAction(e) {
      if (!this.review.id) {
        try {
          const newReview = await this.$store.dispatch('createReview', {
            user_id: this.user.id,
            title: this.review.title,
            type: this.review.type,
            publish_date: this.review.publish_date,
            content_blocks: this.review.content_blocks
          })
          this.formError = null
          const modal = document.querySelector('#review-form-modal')
          this.$uikit.modal(modal).hide()
          await this.$store.dispatch('getUser')
          return newReview
        } catch (e) {
          this.formError = e.response.data.message
          if (e.response.data.errors) {
            this.formError += ' ' + JSON.stringify(e.response.data.errors)
          }
          return e
        }
      } else {
        this.formError = 'TODO: update reviews'
        await this.$store.dispatch('getUser')
      }
    },
    addBlock(
      idx,
      type = 'long_text',
      block = {
        sort: idx,
        type,
        content: ''
      }
    ) {
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
      this.addBlock(toIndex, element.type, element)
    },
    getTimestamp() {
      return parseInt(new Date().getTime() / 1000)
    },
    sanitizedType(type) {
      const newType = type.replace('_', ' ')
      return newType.charAt(0).toUpperCase() + newType.slice(1)
    }
  }
}
</script>
