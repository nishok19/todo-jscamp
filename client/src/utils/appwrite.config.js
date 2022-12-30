import { Client, Account } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("63aee57acdcf19db7e39");

export const account = new Account(client);
