export type DtxApp = {
    id: string;
    name: string;
    category: 'COPD' | 'Remote Monitoring';
};

export const dtxApps = {
    breatheBetter: {
        id: 'breathe-better',
        name: 'BreatheBetter',
        category: 'COPD'
    },

    lungWatch: {
        id: 'lung-watch',
        name: 'LungWatch',
        category: 'COPD'
    },

    clearAir: {
        id: 'clear-air',
        name: 'ClearAir',
        category: 'COPD'
    },

    airPath: {
        id: 'air-path',
        name: 'AirPath',
        category: 'COPD'
    },

    pulsePoint: {
        id: 'pulse-point',
        name: 'PulsePoint',
        category: 'Remote Monitoring'
    }

} as const;