import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ISelectRole } from "../pages/RoleSelection/RoleSelection";
import { RoleSelectionService } from "../services/roleSelection.service";

export type MappedRole = {
    description: string | undefined;
    groupName: string;
};

export const useRoleSelection = (selectRoleInitialForm: ISelectRole) => {
    const navigate = useHistory();
    //Creating new instance of RoleSelectionService
    const roleSelectionService = new RoleSelectionService();

    //Form initial state
    const [roleForm, setRoleForm] = useState<ISelectRole>(selectRoleInitialForm);

    //Saving roles response from service.
    const [rolesList, setRolesList] = useState<MappedRole[]>([]);

    const mapRoles = async () => {
        try {
            const response = await roleSelectionService.GetRoleGroup();
            // Aqui es donde tenes que mapear la respuesta de la API
            const mappedRoles = response.roles.map((role) => {
                return {
                    description: role.description,
                    groupName: role.name,
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
        if (roleForm.name === '') {
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
      if (roleForm.name === "COACH" || roleForm.name === "ADMIN") {
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

    return {
        handleDisabled,
        handleChange,
        handleSubmit,
        roleForm,
        rolesList
    }

}