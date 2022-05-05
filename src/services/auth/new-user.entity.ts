export class NewUserEntity 
{
    constructor
    (
        readonly username: string,
        readonly userSecret: string,
        readonly fullName: string,
    ) {}
}