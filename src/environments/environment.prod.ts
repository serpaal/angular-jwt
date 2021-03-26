export const environment = {
  production: true,
  apiKey: "acc4668611bb31fca99b340a7b05ec676eec845bb3444948f4b02889540572e2",
  hostAuth: "http://159.203.189.218:9001",
  hostToolsOpenProject: "http://localhost:9001/api/v1",
  hostMesaAyuda: "http://localhost:5002/api",
  hostOpenProject: "http://127.0.0.1:8080/api/v3",
  serverOpenProject:  "http://127.0.0.1:8080",
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
