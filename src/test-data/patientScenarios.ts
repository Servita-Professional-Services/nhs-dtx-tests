import {nhsLoginUsers} from './nhsLoginUsers';
import {dtxApps} from './dtxApps';

type PatientScenario = {
    user: (typeof nhsLoginUsers)[keyof typeof nhsLoginUsers];
    apps: readonly (typeof dtxApps)[keyof typeof dtxApps][];
};

export const patientScenarios = {

    prescribedPatients: {
        testuserlive: {
            user: nhsLoginUsers.testuserlive,
            apps: [dtxApps.breatheBetter]
        },

        testuserlive1: {
            user: nhsLoginUsers.testuserlive1,
            apps: [dtxApps.breatheBetter, dtxApps.lungWatch]
        },

        testuserlive11: {
            user: nhsLoginUsers.testuserlive11,
            apps: [dtxApps.clearAir]
        },

        testuserlive17: {
            user: nhsLoginUsers.testuserlive17,
            apps: [dtxApps.pulsePoint]
        },

        testuserlive20: {
            user: nhsLoginUsers.testuserlive20,
            apps: [dtxApps.airPath, dtxApps.clearAir]
        }

    } satisfies Record<string, PatientScenario>,

    noPrescriptionPatients: {
        testuserlive6: {
            user: nhsLoginUsers.testuserlive6,
            apps: []
        }

    } satisfies Record<string, PatientScenario>

} as const;