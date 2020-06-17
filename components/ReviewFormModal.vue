<template>
  <div id="review-form-modal" ref="modal" class="uk-modal" uk-modal>
    <div class="uk-modal-dialog uk-margin-bottom uk-transparent">
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
