import {Collection} from "fireorm";
import {IsArray, IsNumber, IsString} from "class-validator";

@Collection("urls")
export class UserLink {
    @IsString()
    public id: string;

    @IsArray()
    public links: Link[]

    @IsNumber()
    public proxyIndex: number;

    @IsString()
    public userId: string;
}

export class Link {
    @IsString()
    public url: string;

    @IsString()
    public cookie: string;

    @IsString()
    public name: string;

    @IsString()
    public priceOriginal: string;

    @IsString()
    public reference: string;

    @IsArray()
    public prices?: Array<Prices>;
}

export class Prices {
    @IsString()
    public price: string;

    @IsString()
    public currency: string;

    @IsString()
    public date: string;
}