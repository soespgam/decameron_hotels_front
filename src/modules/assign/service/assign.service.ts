import { apiClient } from "../../../shared/axios/axios-imple"
import { Assign } from "../../assign/interface/assign.interface";

export const HttpServicesAssing = {
    createAssing:(assign: Assign):Promise<Assign> =>{
        return apiClient.post('https://us-central1-matig2.cloudfunctions.net/decamero_back/api/newAssignment',assign);
    },
    
    getAssingByHotel:(fk_hotel:any):Promise<Assign[]> =>{
        console.log("id_hotel",fk_hotel)
        return apiClient.post('https://us-central1-matig2.cloudfunctions.net/decamero_back/api/assignments',{fk_hotel});
    },
}