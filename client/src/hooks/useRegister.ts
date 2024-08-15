import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { RegisterService } from "../services/register.service";
import {
  IRegister,
  RegisterResponse,
} from "../pages/Authentication/Register/Register";

export const useRegister = (registerInitialForm: IRegister) => {
  const registerService = new RegisterService();
  const [registerForm, setRegisterForm] =
    useState<IRegister>(registerInitialForm);

  const navigate = useHistory();

  const handleChange = (event: CustomEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  //setting checkbox to true to show password
  const handleShowPasswordChange1 = (event: CustomEvent) => {
    setShowPassword1(event.detail.checked);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true)
    try {
      const response: RegisterResponse | null =
        await registerService.CreateAdmin(registerForm);

      if (!response) {
        throw new Error("No response from server");
      }
      setLoading(false)
      //Navigate to next component
      navigate.push("/confirmation-code", {
        email: registerForm.email,
        username: response.username,
      });
    } catch (error) {
      setLoading(false)
      console.error("Error during creating admin:", error);
    }
  };

  return {
    registerForm,
    showPassword1,
    handleChange,
    handleShowPasswordChange1,
    handleSubmit,
    loading
  };
};
