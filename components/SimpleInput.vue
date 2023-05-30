<script setup lang="ts">
  import { ref } from 'vue'

  import Simple from './Simple.vue'

  const userName = ref('John Doe')
  const userGender = ref('male')
  const photoCount = ref(2)

  const genderOptions = [
    'male',
    'female',
    'unspecified'
  ]
</script>

<template>
  <div>
    <simple :user-name="userName" :user-gender="userGender" :photo-count="photoCount" class="demo" />

    <div>
      <div class="group">
        <input v-model="userName" type="text" id="userName" />
        <label for="userName">$userName</label>
      </div>
      <div class="group">
        <select v-model="userGender" id="userGender">
          <option v-for="gender in genderOptions" :key="gender" :value="gender">{{ gender }}</option>
        </select>
        <label for="userGender">$userGender</label>
      </div>
      <div class="group">
        <input v-model.number="photoCount" type="range" min="1" max="5" id="photoCount" />
        <label for="photoCount">$photoCount</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .demo {
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .group {
    position: relative;
    margin-top: 30px;
  }

  label {
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    left: 5px;
    top: 10px;
  }

  input, select {
    background: none;
    font-size: 18px;
    padding: 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid var(--lt-color-border-dark);
  }
  
  option {
    color: var(--lt-color-text-default);
    background: var(--lt-color-background-default);
  }
  
  input:focus {
    outline: none;
  }
  
  input ~ label, select ~ label {
    top: -14px;
    font-size: 12px;
  }
</style>
