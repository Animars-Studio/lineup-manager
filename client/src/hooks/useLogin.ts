import { FormEvent, useState } from "react";
import { ILogin, LoginResponse } from "../pages/Authentication/Login/Login.interface";
import { useHistory } from "react-router";
import { LoginService } from "../services/login.service";
import {RollVerificationService} from "../services/rollVerification.service"
import { LocalStorageService } from "../services/localStorage.service";


export const useLogin = (loginInitialForm: ILogin) => {
    const localStorageService = new LocalStorageService()
    const rollVerificationService = new RollVerificationService(localStorageService)
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

    //setting checkbox to true to show password
    const handleShowPasswordChange = (event: CustomEvent) => {
        setShowPassword(event.detail.checked)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log('handleSubmit: ',loginForm)
        try {
            const response: LoginResponse | null = await loginService.adminVerification(loginForm);

            if (!response) {
                throw new Error('No response from server');
            }

            console.log('Admin verified successfully', response);

            //Save token in localStorage
            localStorageService.logIn(response.message)

            rollVerificationService.isAdmin()
            //navigate to next component
            //navigate.push('/register')

        } catch (error) {
            console.error("Error during verifying admin: ", error);
        }
    }

    return {
        loginForm,
        showPassword,
        handleChange,
        handleSubmit,
        handleShowPasswordChange
    }

}