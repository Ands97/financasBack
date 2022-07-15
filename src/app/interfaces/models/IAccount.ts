import { SchemaDefinitionProperty } from "mongoose";

export interface IAccount {
    account: string,
    userId: SchemaDefinitionProperty<string>
}