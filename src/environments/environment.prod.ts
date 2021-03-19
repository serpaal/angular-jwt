export const environment = {
  production: true,
  apiKey: "9efc25bc5b43f6c17579c5e4615124886c18cbf2ff18bb5dc409e163a3984986",
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
    workPackages: '/work_packages' 
  }
};
