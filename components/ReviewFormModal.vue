<template>
  <div id="review-form-modal" ref="modal" class="uk-flex-top uk-modal" uk-modal>
    <div class="uk-modal-dialog uk-margin-auto-vertical">
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
