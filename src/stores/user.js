import { defineStore } from "pinia";
import { auth, usersCollection } from "../includes/firebase";
// import router from "../router/index";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {

    /******************************
    * Registration
    ******************************/
    async register(values) {
      // save user authentication signin account
      const userCred = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      // insert users data to the firestore database
      // ".doc(userCred.user.uid)" this will store the users authentication ID on the firestore instead of generating a random one for document

      await usersCollection.doc(userCred.user.uid).set({
        username: values.username,
        email: values.email
      });

      // set users given name to the displayname in firebase
      await userCred.user.updateProfile({
        displayName: values.username,
      });

      this.userLoggedIn = true;
    },

    /******************************
    * Login
    ******************************/
    async authenticate(values) {
      // send request to signin using saved email & password
      await auth.signInWithEmailAndPassword(values.email, values.password);
      this.userLoggedIn = true;
    },
    async signout() {
      await auth.signOut();

      this.userLoggedIn = false;
    }
  }
});