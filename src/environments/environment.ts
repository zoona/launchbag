// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD_c1GqK9StLwqWe1Eh-Wz08btPK5o24Gc",
    authDomain: "launchbag-app.firebaseapp.com",
    databaseURL: "https://launchbag-app.firebaseio.com",
    projectId: "launchbag-app",
    storageBucket: "launchbag-app.appspot.com",
    messagingSenderId: "804238781660"
  }
};
