import * as mongoose from 'mongoose'

export const AdministratorSchema = new mongoose.Schema({
    username:{type: String, require: true},
    password:{type: String, require: true},
    email:{type: String, require: true},
    role:{type: Number, require: true},
    state: {type: Boolean, require: true}
})

export interface Administrator {
    length: number;
    save()
    id: string;
    username: string;
    password: string;
    email:string;
    role:number;
    state: boolean;
}

