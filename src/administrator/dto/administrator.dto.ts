
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
    password:string;
    role: string;
    state: boolean;
    msg:string;
}

export class AdminResponeDto {
    username: string;
    password:string;
    role: string;
    email: string;
    state: boolean;
}

export class UpdateAdminRespone {
    username: string;
    // password: string;
    email: string;
    role: string;
    state: boolean;
}