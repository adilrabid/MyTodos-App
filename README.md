# Mytodos
A vue js based todolist app

**Version 1.0.0**

Click here [Mytodos](https://mytodos-7797f.firebaseapp.com/) and feel free to create an account and mess around the application.

## Some features: 
-	Add/edit your profile credentials.
-	Manage to-dos by marking them as completed/important.
-	Edit to-do’s information such as title, description, due date etc.
-	You can switch between dark/light theme, change background image etc.

It’s a single page application and no server-side language used so you will not face any page reload as it supports Hot Reload.

## Installation
-	First of all, you have to download and install Nodejs from [NodeJS](https://nodejs.org/en/)
-	Open the command prompt and navigate to the root directory of the downloaded repository and run the following command:
```
npm install -g @vue/cli
```
This will allow you to use vue cli.
-	Go to [Firebase](https://firebase.google.com/) and create a new project.
-	The from the firebase project dashboard create a new Realtime database, set the rules to the following:
```javascript
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
After that copy that database url and paste it to ‘/src/main.js in axios.defaults.baseURL= “<your copied url>” on line 22’ in project root directory.
-	The again from the firebase project dashboard go to ‘Authentication’ option, click ‘Set up sign-in method’ and then select ‘Email/password’, enable it and save.
Then go to [Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth) and copy the api endpoint that firebase provides you without ‘/accounts:signInWithCustomToken?key=[API_KEY]’ (example : ` ‘https://identitytoolkit.googleapis.com/v1/’ ` ) and then paste it to: ` ‘/src/axiosCustom.js in baseURL= “<your copied api endpoint>” ` on line 4’ of project root directory.
-	Then copy the final api key from firebase project dashboard > settings > Project settings > Web API Key and paste it to: ` ‘/src/store.js in apiKey: “<your copied api endpoint>” ` on line 26’ of project root directory.

#### Ok you’re all set up.

#### Now in order to actually run the application, open the command prompt and run:
```
npm run serve
```
This will create a virtual development server and the app will be served at something like this : localhost://XXXX

## Thank you!







