import { ApiProperty } from "@nestjs/swagger";

export class FindAdminsResponesDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: number;

    @ApiProperty()
    state: boolean;
}

export class CreateAdminDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: number;

    @ApiProperty()
    state: boolean;
    @ApiProperty()
    msg: string;
}

export class AdminResponeDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: number;

    @ApiProperty()
    state: boolean;
}

export class UpdateAdminRespone {
    @ApiProperty()
    username: string;

    // @ApiProperty()
    // password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: number;

    @ApiProperty()
    state: boolean;
}

export class loginDTO {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}