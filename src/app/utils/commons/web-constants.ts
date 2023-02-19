import { environment } from "src/environments/environment";

const BASE_URL: string = environment.BASE_URL;

export const ENDPOINTS = {    
    getPersonas: (): string => {
        return `${BASE_URL}Persona/GetAll`;
    },
    registerPersona: (): string => {
        return `${BASE_URL}Persona/Create`;
    },
    updatePersona  : (): string => {
        return `${BASE_URL}Persona/Update`;
    },
    getByIdPersona : (id: number): string => {
        return `${BASE_URL}Persona/GetById/${id}`;
    },
    deleteByIdPersona : (id: number): string => {
        return `${BASE_URL}Persona/Delete?id=${id}`;
    }
}