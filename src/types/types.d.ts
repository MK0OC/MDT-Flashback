export interface User {
    id: string;
    name: string;
    email: string;
    discordId?: string;

    status: string;
    role: string;
    mdtAccess: string[];

    granted: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export interface Citizen {
    id: string;
    firstname: string;
    lastname: string; 
    email: string;
    phonenumber: string;

    weight: string;
    height: string;
    sex: string;
    birthdate: Date;

    picture: string | null;
    
    createdAt: Date;
}

export interface Intervention {
    id: string;

    clinicalExam: string;
    careProvided: string;
    checkup: string;
    ata: string;

    createdAt: Date;
}