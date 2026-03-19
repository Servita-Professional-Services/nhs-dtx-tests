export type NhsLoginUser = {
    email: string;
    password: string;
    otpCode: string;
    im1: boolean;
    proofingLevel: 'P9' | 'P5';
    nhsNumber: string;
    odsCode: string;
    firstName: string;
    surname: string;
    dateOfBirth: string;
    postcode: string;
    mobileNumber: string;
    reportLabel: string;
};

export const nhsLoginUsers: Record<string, NhsLoginUser> = {
    testuserlive: {
        email: 'testuserlive@demo.signin.nhs.uk',
        password: 'Passw0rd$1',
        otpCode: '190696',
        im1: true,
        proofingLevel: 'P9',
        nhsNumber: '9686368973',
        odsCode: 'C83615',
        firstName: 'Mona',
        surname: 'MILLAR',
        dateOfBirth: '12/02/1968',
        postcode: 'HD7 4JL',
        mobileNumber: '+447887510887',
        reportLabel: 'Default actionable patient',
    },

    testuserlive1: {
        email: 'testuserlive+1@demo.signin.nhs.uk',
        password: 'Passw0rd$1',
        otpCode: '190696',
        im1: false,
        proofingLevel: 'P9',
        nhsNumber: '9686368906',
        odsCode: 'C83615',
        firstName: 'Iain',
        surname: 'HUGHES',
        dateOfBirth: '01/02/1942',
        postcode: 'HD1 4LR',
        mobileNumber: '+447887510887',
        reportLabel: 'Patient with multiple DTx apps',
    },

    testuserlive11: {
        email: 'testuserlive+11@demo.signin.nhs.uk',
        password: 'Passw0rd$1',
        otpCode: '190696',
        im1: true,
        proofingLevel: 'P9',
        nhsNumber: '9658220142',
        odsCode: 'A20047',
        firstName: 'Emilie',
        surname: 'KEWN',
        dateOfBirth: '1999-10-03 00:00:00',
        postcode: 'DN16 2LP',
        mobileNumber: '+447887510887',
        reportLabel: 'ClearAir prescribed patient',
    },

    testuserlive17: {
        email: 'testuserlive+17@demo.signin.nhs.uk',
        password: 'Passw0rd$1',
        otpCode: '190696',
        im1: false,
        proofingLevel: 'P9',
        nhsNumber: '9661033404',
        odsCode: 'A00002',
        firstName: 'Lee',
        surname: 'POWELL-CID',
        dateOfBirth: '1984-01-07 00:00:00',
        postcode: 'M21 7HW',
        mobileNumber: '+447887510887',
        reportLabel: 'PulsePoint prescribed patient',
    },

    testuserlive20: {
        email: 'testuserlive+20@demo.signin.nhs.uk',
        password: 'Passw0rd$1',
        otpCode: '190696',
        im1: false,
        proofingLevel: 'P9',
        nhsNumber: '9661033498',
        odsCode: 'A00002',
        firstName: 'Gail',
        surname: 'BARKER-CID',
        dateOfBirth: '1992-02-28 00:00:00',
        postcode: 'M20 1FF',
        mobileNumber: '+447887510887',
        reportLabel: 'AirPath and ClearAir prescribed patient',
    },

    testuserlive6: {
        email: 'testuserlive+6@demo.signin.nhs.uk',
        password: 'Passw0rd$1',
        otpCode: '190696',
        im1: true,
        proofingLevel: 'P9',
        nhsNumber: '9658218989',
        odsCode: 'A20047',
        firstName: 'Mina',
        surname: 'LEECH',
        dateOfBirth: '1918-09-19 00:00:00',
        postcode: 'DN9 1TL',
        mobileNumber: '+447887510887',
        reportLabel: 'Logged in, no prescribed apps',
    },
};