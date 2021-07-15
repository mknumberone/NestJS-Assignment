
export class FindAdminsResponesDto {
    username: string;
    password: string;
    email: string;
    role: string;
    state: boolean;
}

export class CreateAdminDto {
    username: string;
    email: string;
    role: string;
    state: boolean;
}

export class AdminResponeDto {
    username: string;
    email: string;
    role: string;
    state: boolean;
}

export class UpdateAdminRespone {
    username: string;
    password: string;
    email: string;
    role: string;
    state: boolean;
}