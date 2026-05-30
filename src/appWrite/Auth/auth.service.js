import config from '../../config/config'
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    //when user call the object or when an object of the class is created, then the constructor will create client, rather than directly creating the client above, which will be wastage of resources.
    constructor(){
        this.client.setEndpoint(config.APPWRITE_URL)
        .setProject(config.APPWRITE_PROJECT_ID);

        this.account = new Account(this.client)
    }

    //method to call all services of appwrite
    async createAccount({
        email, password, name
    }){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount) {

                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.log("ERROR In Account Creation: ",error)
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password
        )
        } catch (error) {
            console.log ( "ERROR IN LOGIN: ", error)
            throw error;
        }
    }

    // In auth.service.js, add more logging
// async login({email, password}){
//     console.log("AuthService.login called with:", email);
//     try {
//         console.log("Calling Appwrite createEmailPasswordSession");
//         const result = await this.account.createEmailPasswordSession(email, password);
//         console.log("Appwrite login successful, session ID:", result?.$id);
//         return result;
//     } catch (error) {
//         console.log("Appwrite login ERROR:", error);
//         console.log("Error code:", error.code);
//         console.log("Error message:", error.message);
//         throw error;
//     }
// }



    //Check if user logged in ?
    async getCurrentUser() {
        try {
    return await this.account.get();
} catch (err) {
    if(err.code === 401) {
    return null;
}
console.error("ERROR: APPWRITE SERVICE:", err);
        return null;
    }
    }

    async logout(){
        try {
            await this.account.deleteSessions("current")
        } catch (error) {
            console.log("ERROR: CANNOT LOG OUT",error)
            throw error
        }
    }

}

const authService = new AuthService()

//Instead of exporting the class, we have exported the object.
//Benifit of that is, if another component wants to access the service then they do not have to create objects, they can directly use this exported service.

////like here we have created 4 methods/services : createAccount, Login, getCurrentUser, Logout.
//so in another components we can directly access using authService.Login() like this.

export default authService;


//This is one way, now if i want the same in register component then there i have to export it.
//Without the service class approach, every file would need: client(), Account() again and again, That leads to duplicated code.
    

// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create({
//     userId: ID.unique(), 
//     email: 'email@example.com', 
//     password: 'password'
// });


//This is a future proof code/Reusable code.