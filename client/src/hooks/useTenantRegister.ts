import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { RegisterService } from "../services/register.service";
import { ITenant } from "../pages/Main/TenantRegister/TenantRegister.interface";


export const useTenantRegister = (tenantInitialForm: ITenant) => {
    
    const registerService = new RegisterService()
    const [tenantForm, setTenantForm] = useState<ITenant>(tenantInitialForm)
    const navigate = useHistory();
    const handleNavigation = (): void => {
        navigate.push('/authentication/login')
    }

    const handleChange = (event: CustomEvent) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setTenantForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(tenantForm)
        // try {
        //     //const response: RegisterResponse = await sexooo.CreateAdmin(tenantForm);
        //     if (response.error) {
        //         console.error(response.message);
        //     } else {
        //         console.log("Login successful:", response);
        //     }
        // } catch (error) {
        //     console.error("Error during creating admin:", error);
        // }
    }

    return {
        tenantForm,
        handleChange,
        handleNavigation,
        handleSubmit
    }
}

