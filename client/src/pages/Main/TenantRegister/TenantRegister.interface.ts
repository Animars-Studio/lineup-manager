export interface ITenant {
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',
    building: '',
    apartment: '',
}
export interface TenantResponse {
    id?: number;
    username?: string;
    email?: string;
    error?: boolean;
    message?: string;
}