import { Client, Account } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("6395e30bb7bddc91a23b");

export const account = new Account(client);
