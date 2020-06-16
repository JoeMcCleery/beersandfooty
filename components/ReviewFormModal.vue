<template>
  <div id="review-form-modal" ref="modal" class="uk-flex-top uk-modal" uk-modal>
    <div
      class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-transparent"
    >
      <review-form />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewFormModal',
  components: { ReviewForm: () => import('~/components/ReviewForm.vue') }
}
</script>
