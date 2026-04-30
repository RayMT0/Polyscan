<script setup lang="ts">
interface ConfirmDialogProps {
    title?: string,
    description?: string,
    body?: string,
    bodyHighlighted?: string,
    confirmColor?: "info" | "error" | "primary" | "success" | "warning",
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
        :ui="{ 
            overlay: 'rounded-xl',
            content: 'divide-y-0',
            body: 'grow overflow-y-auto line-clamp-2 break-all wrap-anywhere',   
            footer: 'justify-end',
        }"
    >
        <template v-if="body" #body>
            <p  class="text-highlighted">{{ body }}<strong v-if="bodyHighlighted">&nbsp{{ bodyHighlighted }}</strong>.</p>
        </template>
        <template #footer>
            <UButton :label="cancelLabel ?? 'Cancel'" color="neutral" variant="outline" @click="emits('close', false)"/>
            <UButton :label="confirmLabel ?? 'Confirm'" :color="confirmColor ?? 'neutral'" @click="emits('close', true)" />
        </template>
    </UModal>
</template>