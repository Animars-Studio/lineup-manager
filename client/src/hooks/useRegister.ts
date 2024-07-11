import { FormEvent, useState } from "react";
import { IRegister, RegisterResponse } from "../pages/Authentication/Register/Register.interface";
import { useHistory } from "react-router-dom";
import { RegisterService } from "../services/register.service";

export const useRegister = (registerInitialForm: IRegister) => {
    const registerService = new RegisterService();
    const [registerForm, setRegisterForm] = useState<IRegister>(registerInitialForm)

    const navigate = useHistory();    

    const handleChange = (event: CustomEvent) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setRegisterForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [showPassword1, setShowPassword1] = useState<boolean>(false)

    //setting checkbox to true to show password
    const handleShowPasswordChange1 = (event: CustomEvent) => {
        setShowPassword1(event.detail.checked)
    }


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log('handleSubmit: ', registerForm)
        try {
            const response: RegisterResponse | null = await registerService.CreateAdmin(registerForm)
            
            if (!response) {
                throw new Error('No response from server');
            }
            
            console.log('Admin created successfully', response);
            //Navigate to next component
            navigate.push('/confirmation-code', {
                email:registerForm.email,
                username:response.username
            })

        } catch (error) {
            console.error("Error during creating admin:", error);
        }
    }

    return {
        registerForm,
        showPassword1,
        handleChange,
        handleShowPasswordChange1,
        handleSubmit
    }
}

