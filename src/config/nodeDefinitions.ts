export const nodeDefinitions = {
    triggerNode: {
      label: 'Trigger',
      color: '#f87171',
      handleType: 'source',
      options: [
        { value: 'price_above', label: 'Price Above' },
        { value: 'price_below', label: 'Price Below' },
      ],
    },
    actionNode: {
      label: 'Action',
      color: '#34d399',
      handleType: 'target',
      options: [
        { value: 'log', label: 'Log' },
        { value: 'alert', label: 'Alert' },
        { value: 'buy', label: 'Buy' },
      ],
    },
  } as const;
  
  export type NodeKind = keyof typeof nodeDefinitions;