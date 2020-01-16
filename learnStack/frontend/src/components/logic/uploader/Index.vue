<template>
  <label class="g-uploader" :for="id">
    <div class="g-uploader__toggle"><slot></slot></div>
    <input type="file" class="g-uploader__file" 
    :id="id" 
    :multiple="multiple"
    :accept="accept"
    :disabled="disabled"
    @change="onFileChange"
    >
  </label>
</template>

<script>
  export {default} from './Upload'
</script>