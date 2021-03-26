export interface Incidentes {
    nro_inc: String;
    fecha_sol: Date;
    nomb_comp: String;
    arch_adj: String;
    observ: String;
    descrip: String;  
    cod_u_rbl: String;
    estado: String;
    open_project_id?: string;
    open_project_identifier?: string;
    open_project_title?: string;
    open_project_status?: string;
    open_project_percentage_done: number,
    open_project_assignee: string,
    open_project_priority: string,
    username: string;  
    created_at?: Date;
    updated_at?: Date;
}
