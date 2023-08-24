import { apiClient } from "../../../shared/axios/axios-imple"
import { Hotel } from "../interface/hotel.interface"

export const HttpServices = {
    getHotels:():Promise<Hotel[]> =>{
        return apiClient.get('https://us-central1-matig2.cloudfunctions.net/decamero_back/api/hotels');
    },
    createHotel:(hotel: Hotel):Promise<Hotel> =>{
        return apiClient.post('https://us-central1-matig2.cloudfunctions.net/decamero_back/api/newHotel',hotel);
    },
    getHotelById:(id:any):Promise<Hotel[]> =>{
        return apiClient.get(`https://us-central1-matig2.cloudfunctions.net/decamero_back/api/hotel/${id}`);
    },


}