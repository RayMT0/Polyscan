<script setup lang="ts">

</script>

<template>
    <NavBar />
    <UMain 
        class="lg:flex lg:relative lg:w-full lg:gap-2 lg:mx-auto lg:flex-1 lg:h-full lg:box-border lg:max-w-7xl lg:px-6 pb-8 lg:pt-3 px-5"
    >
        <slot />
    </UMain>
</template>