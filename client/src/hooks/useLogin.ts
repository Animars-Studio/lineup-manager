import { FormEvent, useState } from "react";
import { ILogin, LoginResponse } from "../pages/Authentication/Login/Login";
import { useHistory } from "react-router";
import { LoginService } from "../services/login.service";
import {RoleVerificationService} from "../services/roleVerification.service"
import { LocalStorageService } from "../services/localStorage.service";


export const useLogin = (loginInitialForm: ILogin) => {
    const localStorageService = new LocalStorageService()
    const roleVerificationService = new RoleVerificationService(localStorageService)
    const loginService = new LoginService()
    const [loginForm, setLoginForm] = useState<ILogin>(loginInitialForm)
    const navigate = useHistory();

    const handleChange = (event: CustomEvent) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setLoginForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    //setting checkbox to true to show password
    const handleShowPasswordChange = (event: CustomEvent) => {
        setShowPassword(event.detail.checked)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true)
        try {
            const response: LoginResponse | null = await loginService.adminVerification(loginForm);

            if (!response) {
                throw new Error('No response from server');
            }
            localStorageService.logIn(response.message)
            setLoading(false)
            console.log("Login success")
            
            navigate.push('/role-selection')
            
        } catch (error) {
            setLoading(false)
            console.error("Error during verifying admin: ", error);
        }
    }

    return {
        loginForm,
        showPassword,
        handleChange,
        handleSubmit,
        handleShowPasswordChange,
        loading
    }

}