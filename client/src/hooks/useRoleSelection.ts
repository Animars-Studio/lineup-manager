import { FormEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { ISelectRole } from "../pages/RoleSelection/RoleSelection"; 
import { RoleSelectionService } from "../services/roleSelection.service";


export const useRoleSelection = (selectRoleInitialForm:ISelectRole) => {
    //Creating new instance of RoleSelectionService
    const roleSelectionService = new RoleSelectionService();

    //Form initial state
    const [roleForm, setRoleForm] = useState<ISelectRole>(selectRoleInitialForm)

    //Saving roles response from service.
    const [rolesList, setRolesList] = useState<ISelectRole[]>([]);

    const navigate = useHistory();
    const handleNavigation = (): void => {
        navigate.push('/login')
    }
    
    const mapRoles = async () =>{
        try {
            const response = await roleSelectionService.GetRoleGroup()
            setRolesList(response.roles)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        mapRoles()
    },[])

    const handleDisabled = () =>{
       if(roleForm.name === ''){
        return true
       }
       return false
    }

    const handleChange = (event: CustomEvent) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setRoleForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            console.log(roleForm);
            //Navigate to create team component
            if(roleForm.name === 'COACH' || roleForm.name === 'ADMIN'){
                console.log('ADMIN o COACH')
                navigate.push('/create-team')
                return
            } 
            //Navigate to dashboard
            console.log('PLAYER')
            navigate.push('/dashboard')
        } catch (error) {
            console.error("Error adding user group:", error);
        }
    }
    
    return {
        handleDisabled,
        handleChange,
        handleSubmit,
        roleForm,
        rolesList
    }

}