<script setup lang="ts">
interface ConfirmDialogProps {
    title?: string,
    description?: string,
    confirmColor?: string,
    confirmLabel?: string,
    cancelLabel?: string 
}

defineProps<ConfirmDialogProps>()

const emits = defineEmits<{
    close: [value: boolean];
}>()

</script>

<template>
    <UModal 
        :title="title"
        :description="description"
        :dismissable="false"
        :ui="{ footer: 'justify-end' }"
    >
        <template #footer>
            <UButton :label="cancelLabel ?? 'Cancel'" color="neutral" variant="outline" @click="emits('close', false)"/>
            <UButton :label="confirmLabel ?? 'Confirm'" :color="confirmColor ?? 'neutral'" @click="emits('close', true)" />
        </template>
    </UModal>
</template>