import ConfirmDialog from "#components";

export interface ConfirmDialogOptions {
    title: string,
    description?: string,
    confirmColor?: string,
    confirmLabel?: string,
    cancelLabel?: string,
}

export const useConfirmDialog = () => {
    const overlay = useOverlay()

    const confirm = (options: ConfirmDialogOptions): Promise<boolean> => {
        const modal = overlay.create(ConfirmDialog, {
            destroyOnClose: true,
            props: options,
        })

        return modal.open();
    }
    return {
        confirm,
    }
}