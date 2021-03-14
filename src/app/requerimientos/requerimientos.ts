
export interface Requerimientos {
   id: number;  
   nro_req: string;
   fecha_sol: Date;
   nomb_comp: string;
   descrip_req: string;
   justific: string;
   cod_u_rbl: string;
   observ?: string;
   arch_adj?: string;
   estado: string;
   open_project_id?: string;
   open_project_title?: string;
   open_project_status?: string;
   username: string;  
   created_at?: Date;
   updated_at?: Date;
}