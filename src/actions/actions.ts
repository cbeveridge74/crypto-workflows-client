// runtime/actions.ts
export const actionHandlers: Record<string, (message: string) => void> = {
    log: (message: string) => console.log(`🪵 ACTION: ${message}`),
    alert: (message: string) => alert(`🚨 ACTION: ${message}`),
};