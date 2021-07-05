import * as mongoose from 'mongoose'

export const AdministratorSchema = new mongoose.Schema({
    username:{type: String, require: true},
    password:{type: String, require: true},
    state: {type: Boolean, require: true}
})

export interface Administrator {
    save()
    id: string;
    username: string;
    password: string;
    state: boolean;
}