export class AuthUser {
    public token: string;
    public id: string;
    public email: string;
    public name: string;

    public constructor(
        token: string,
        id: string,
        name: string,
        email: string
    ) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }
}