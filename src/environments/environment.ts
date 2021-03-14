// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: "9efc25bc5b43f6c17579c5e4615124886c18cbf2ff18bb5dc409e163a3984986",
  hostAuth: "http://159.203.189.218:9001",
  hostToolsOpenProject: "http://localhost:9001/api/v1",
  hostMesaAyuda: "http://localhost:5002/api",
  hotOpenProject: "http://localhost:8080",
  endpoints: {
    login: "/auth/login",
    requerimientosMesaAyuda: "/requeriminf",
    requerimientos: "/requerimientos",   
    setRequerimientos: "/requerimientos/set_requerimientos_json" 
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
