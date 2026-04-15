export default defineEventHandler(async () => {
    const config = useRuntimeConfig();

    const res = await $fetch(`${config.MCP_URL}/mcp`)
});