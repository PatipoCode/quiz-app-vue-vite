<script setup lang="ts"></script>

<template>
  <div class="screen">
    <header v-if="$slots.header" class="header">
      <slot name="header" />
    </header>

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.screen {
  position: relative;
  min-height: 620px;
  max-width: 375px;
  margin: 50px auto auto;
  padding: 15px 20px;
  background-color: $bg-color;
  color: $btn-txt-color;
}

.main :slotted(.title),
.header :slotted(.title) {
  text-align: center;
  color: $primary;
  font-size: 30px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.main :slotted(.subtitle),
.header :slotted(.subtitle) {
  text-align: center;
  color: $secondary;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
}

.header :slotted(.cursive) {
  font-family: "Niconne", cursive;
  font-weight: 400;
  font-size: 36px;
  margin-top: 52px;
}
</style>
