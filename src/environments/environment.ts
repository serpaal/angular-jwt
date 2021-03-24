// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: "acc4668611bb31fca99b340a7b05ec676eec845bb3444948f4b02889540572e2",
  hostAuth: "http://159.203.189.218:9001",
  hostToolsOpenProject: "http://localhost:9001/api/v1",
  hostMesaAyuda: "http://localhost:5002/api",
  hostOpenProject: "http://127.0.0.1:8080/api/v3",
  endpoints: {
    login: "/auth/login",
    requerimientosMesaAyuda: "/requeriminf",
    requerimientos: "/requerimientos",   
    setRequerimientos: "/requerimientos/set_requerimientos_json",
    updateRequerimientos: "/requerimientos/update_requerimientos_json",
    incidentesMesaAyuda: "/incidentesinf",
    incidentes: "/incidentes",   
    setIncidentes: "/incidentes/set_incidentes_json",
    updateIncidentes: "/incidentes/update_incidentes_json",
    projects: '/projects',
    workPackages: '/work_packages',
    priorities: '/priorities',
    users: '/users',
    memberships: '/memberships' 
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
