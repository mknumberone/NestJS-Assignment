import * as mongoose from 'mongoose'

export const DepartmentSchema = new mongoose.Schema({
    namedepartment:{type: String, require: true},
    officephone:{type:Number,require: true},
    manager:{type: String, require: true}
})

export interface Department {
    save()
    id: string;
    namedepartment:string;
    officephone:number;
    manager:string;
}