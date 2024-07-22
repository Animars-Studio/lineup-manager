import { FormEvent, useEffect, useRef, useState } from "react";
//import {IConfirmationCodeResponse } from "../pages/Authentication/Confirmation-code/Confirmation-Code.interface";
import { useHistory } from "react-router";
import { ICreateTeam } from "./CreateTeam";

//import { ConfirmationCodeService } from "../services/confirmation-code.service";


export const useCreateTeam = (createTeamInitialForm:ICreateTeam) => {

    const [createTeamForm, setCreateTeamForm] = useState<ICreateTeam>(createTeamInitialForm)


    const navigate = useHistory();
    const handleNavigation = (): void => {
        navigate.push('/login')
    }

    const handleDisabled = () =>{
       if(createTeamForm.teamName === ''){
        return true
       }
       return false
    }

    const handleChange = (event: CustomEvent) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setCreateTeamForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            console.log(createTeamForm);
            //Navigate to next component
            handleNavigation()
        } catch (error) {
            console.error("Error during login:", error);
        }
    }
    
    return {
        handleDisabled,
        handleChange,
        handleSubmit,
        createTeamForm
    }

}