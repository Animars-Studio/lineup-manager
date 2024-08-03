import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ISelectRole } from "../pages/RoleSelection/RoleSelection";
import { ISetRoleResult, RoleSelectionService } from "../services/roleSelection.service";
import { RoleVerificationService } from "../services/roleVerification.service";
import { LocalStorageService } from "../services/localStorage.service";

export type MappedRole = {
    groupName: string;
    description: string | undefined;
};



export const useRoleSelection = (selectRoleInitialForm: ISelectRole) => {
    const navigate = useHistory();
    //Creating new instance of RoleSelectionService
    const roleSelectionService = new RoleSelectionService();

    //Form initial state
    const [roleForm, setRoleForm] = useState<ISelectRole>(selectRoleInitialForm);

    //Saving roles response from service.
    const [rolesList, setRolesList] = useState<MappedRole[]>([]);

    const localStorageService = new LocalStorageService();
    const roleVerificationService = new RoleVerificationService(localStorageService);

    const mapRoles = async () => {
        try {
            const response = await roleSelectionService.GetRoleGroup();
            // Aqui es donde tenes que mapear la respuesta de la API
            const mappedRoles = response.roles.map((role) => {
                console.log("Imprimir roles", Object.values(role))
                return {
                    groupName: Object.values(role)[1] as string,
                    description: role.description,
                };
            });
            setRolesList(mappedRoles);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        mapRoles();
    }, []);

    const handleDisabled = () => {
        if (roleForm.groupName === '') {
            return true
        }
        return false
    }

    const handleChange = (event: CustomEvent) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setRoleForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        roleForm.username = roleVerificationService.getUsername() as string;
        // Revisate este comment para modificar el codigo siguiente
        // 1. No es necesario un try/catch si no vas a hacer alguna operacion asincrona o
        // bien una operacion que pueda fallar
        // 2. Siempre hay que rederigir al usuario al /Dashboard y alli
        // ver que role tiene (te deje comment alli)
        // 3. Para checkear el role del usuario siempre usemos el servicio
        // que tenes creado para isAdmin, isCoach, isPlayer etc.
        try {
            console.log(roleForm);
            //Navigate to create team component
            const response: ISetRoleResult | null = await roleSelectionService.SetRoleGroup(roleForm);
            if (!response) {
                throw new Error('No response from server');
            }
            if (roleForm.groupName === "COACH" || roleForm.groupName === "ADMIN") {
                console.log("ADMIN o COACH");
                navigate.push("/create-team");
                return;
            }
            //Navigate to dashboard
            console.log("PLAYER");
            navigate.push("/dashboard");
        } catch (error) {
            console.error("Error adding user group:", error);
        }
    };
    /*
    
    const handleSubmit = async (event: FormEvent) => {
            event.preventDefault();
            try {
                const response: LoginResponse | null = await loginService.adminVerification(loginForm);
    
                if (!response) {
                    throw new Error('No response from server');
                }
    
                //Save token in localStorage
                localStorageService.logIn(response.message)
                console.log("Login success")
                //roleVerificationService.isAdmin()
                //navigate to next component
                navigate.push('/role-selection')
    
            } catch (error) {
                console.error("Error during verifying admin: ", error);
            }
        }
    */
    return {
        handleDisabled,
        handleChange,
        handleSubmit,
        roleForm,
        rolesList
    }

}