<template>
  <div
    class="review-form uk-grid uk-flex-center uk-flex-middle uk-margin-bottom uk-child-width-1-1 uk-child-width-1-2@m"
    uk-grid
  >
    <div class="uk-position-relative">
      <a href="#review-form-modal" class="uk-modal-close-default" uk-toggle>
        <span
          class="uk-icon-link icon-red"
          uk-icon="icon: close; ratio: 2.2;"
        />
      </a>
      <form v-if="loggedIn" class="uk-background-default">
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
              <input
                id="title"
                v-model="review.title"
                name="title"
                title="title"
                type="text"
                class="uk-input uk-width-expand"
                placeholder="Review Title"
                required="required"
              />
            </div>
          </div>

          <div class="uk-margin uk-hidden">
            <div class="uk-inline uk-width-1-1">
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

          <div class="uk-margin uk-text-center">
            <label for="typeBeer" class="uk-inline">
              <input
                id="typeBeer"
                v-model="review.type"
                name="typeBeer"
                title="typeBeer"
                type="radio"
                class="uk-hidden"
                value="beer"
              />
              <a class="icon-container">
                <img
                  class="icon-beer"
                  data-src="@/assets/images/beer-icon.svg"
                  uk-svg
                />
              </a>
            </label>
            <label for="typeFooty" class="uk-inline">
              <input
                id="typeFooty"
                v-model="review.type"
                name="typeFooty"
                title="typeFooty"
                type="radio"
                class="uk-hidden"
                value="footy"
              />
              <a class="icon-container">
                <img
                  class="icon-footy"
                  data-src="@/assets/images/football-icon.svg"
                  uk-svg
                />
              </a>
            </label>
          </div>

          <ul
            v-if="sortedContentBlocks.length"
            class="blocks uk-grid-stack uk-grid-collapse uk-list uk-list-striped"
            uk-grid
          >
            <li
              v-for="(block, idx) in sortedContentBlocks"
              :key="encodeURI(idx + block.type + block.sort)"
              class="uk-width-1-1"
            >
              <div class="uk-animation-fade uk-position-relative">
                <div class="uk-position-top-right">
                  <a
                    id="removeBlock"
                    name="removeBlock"
                    :title="'Trash ' + sanitizedType(block.type) + ' Block'"
                    type="button"
                    class=""
                    @click="removeBlock(idx)"
                  >
                    <span
                      uk-icon="icon: trash; ratio: 1.5;"
                      class="uk-icon-link icon-red"
                    />
                  </a>
                </div>
                <div>
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
                    :title="'Move ' + sanitizedType(block.type) + ' block up'"
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
                    :title="'Move ' + sanitizedType(block.type) + ' block down'"
                    type="button"
                    class="uk-button uk-button-default uk-button-small"
                    @click="moveBlock(idx, idx + 1)"
                  >
                    <span uk-icon="icon: chevron-down" />
                  </button>
                </div>

                <div class="uk-margin-small-top">
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
                      class="uk-input uk-text-center"
                      placeholder="content here..."
                      required="required"
                    />
                    <div
                      v-if="['image'].some((v) => block.type === v)"
                      class="uk-text-center"
                    >
                      <label
                        class="uk-button uk-button-default uk-button-small"
                      >
                        <span uk-icon="icon: upload; ratio: 0.9;" />
                        Upload <span v-if="block.content">New </span>Image
                        <input
                          name="content"
                          title="content"
                          type="file"
                          class="uk-text-center uk-width-expand"
                          placeholder="content here..."
                          required="required"
                          accept="image/x-png,image/gif,image/jpeg"
                          hidden
                          @change="saveImageForBlock($event, block)"
                        />
                      </label>
                      <div class="uk-width-1-1">
                        <img
                          :src="block.content"
                          class="uk-height-small uk-margin-small-top"
                          :class="{ 'uk-width-small': !block.content }"
                          uk-img
                        />
                      </div>
                    </div>
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
                        step="0.01"
                        class="uk-input uk-form-width-small"
                        placeholder="score..."
                        required="required"
                      />
                      <span class="uk-inline uk-text-center">
                        / 100
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="uk-margin">
            <div
              class="uk-grid-small uk-child-width-auto uk-flex uk-flex-center"
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
            :class="{ 'uk-disabled': submitting }"
            @click.prevent="formAction"
          >
            <span v-if="!submitting" uk-icon="icon: plus; ratio: 0.7;" />
            <div v-else uk-spinner="ratio: 0.5;"></div>
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
      submitting: false,
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
      previewData.publish_date = this.getTimestamp()
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
      if (!this.submitting) {
        this.submitting = true
        if (!this.review.id) {
          this.review.publish_date = this.getTimestamp()
          try {
            await this.$store
              .dispatch('createReview', {
                user_id: this.user.id,
                title: this.review.title,
                type: this.review.type,
                publish_date: this.review.publish_date,
                content_blocks: this.review.content_blocks
              })
              .then((data) => {
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
                this.formError = null
                const modal = document.querySelector('#review-form-modal')
                this.$uikit.modal(modal).hide()
                this.$store.dispatch('getCurrentUser')
                this.submitting = false
                return data
              })
          } catch (e) {
            this.formError = e.message
            this.submitting = false
            if (e.response && e.response.data && e.response.data.errors) {
              this.formError += JSON.stringify(
                this.getErrors(e.response.data.errors)
              )
            }
            return e
          }
        } else {
          try {
            await this.$store
              .dispatch('updateReview', {
                review_id: this.review.id,
                title: this.review.title,
                type: this.review.type,
                publish_date: this.review.publish_date,
                content_blocks: this.review.content_blocks
              })
              .then((data) => {
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
                this.formError = null
                const modal = document.querySelector('#review-form-modal')
                this.$uikit.modal(modal).hide()
                this.$store.dispatch('getCurrentUser')
                this.submitting = false
                return data
              })
          } catch (e) {
            this.formError = e.message
            this.submitting = false
            if (e.response && e.response.data && e.response.data.errors) {
              this.formError += JSON.stringify(
                this.getErrors(e.response.data.errors)
              )
            }
            return e
          }
        }
      }
    },
    getErrors(e) {
      let string = ''
      Object.values(e).forEach((data) => {
        string += ' ' + data[0]
      })
      return string
    },
    saveImageForBlock(e, block) {
      const files = e.target.files || e.dataTransfer.files
      if (files.length) {
        const reader = new FileReader()
        reader.onload = (e) => {
          block.content = e.target.result
        }
        reader.readAsDataURL(files[0])
      } else {
        block.content = 'https://via.placeholder.com/512'
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
