import { ConflictException } from "@nestjs/common";

export class EmailAlreadyExists extends ConflictException {
    constructor() {
        super("User with this email already exists");
    }
}
