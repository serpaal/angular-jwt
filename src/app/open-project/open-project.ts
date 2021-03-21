import { Incidentes } from "../incidentes/incidentes";
import { Requerimientos } from "../requerimientos/requerimientos";

export interface OpenProject {
    requerimiento: Requerimientos;
    incidente: Incidentes;
    esRequerimiento: boolean;
    isSaved: boolean;
}
