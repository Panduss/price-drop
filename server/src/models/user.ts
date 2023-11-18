import {Collection} from "fireorm";
import {IsEmail, IsString} from "class-validator";

@Collection("users")
export class User {

    @IsString()
    public id: string;

    @IsEmail()
    public email: string;

    @IsString()
    public name: string;

}
