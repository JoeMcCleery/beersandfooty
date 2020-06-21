<template>
  <div
    id="review-form-modal"
    ref="modal"
    class="uk-modal-container uk-flex-top uk-modal"
    uk-modal
  >
    <div
      class="uk-modal-dialog uk-margin-auto-vertical uk-transparent uk-margin-bottom"
    >
      <review-form :modal="$refs.modal" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewFormModal',
  components: { ReviewForm: () => import('~/components/ReviewForm.vue') }
}
</script>
