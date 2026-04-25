<script setup lang="ts">

</script>

<template>
    <div class="max-h-dvh min-h-dvh flex w-full flex-col">
        <NavBar />
        <UMain 
            class="lg:flex lg:relative lg:w-full lg:gap-2 lg:mx-auto lg:flex-1 lg:h-full lg:box-border lg:max-w-7xl pb-8 lg:pt-3 min-h-0"
        >
            <slot />
        </UMain>
    </div>
</template>