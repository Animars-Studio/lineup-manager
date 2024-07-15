import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonInput,
  IonItem,
} from "@ionic/react";
import "./Login.css";
import { useLogin } from "../../../hooks/useLogin";
import { useLocation } from "react-router";

export interface ILogin {
  username: string;
  password: string;
}
export interface LoginResponse {
  message: string;
}

const loginInitialForm: (defaultUsername: string) => ILogin = (
  defaultUsername = ""
) => {
  return {
    username: defaultUsername,
    password: "",
  };
};

export const Login: React.FC = () => {
  const location = useLocation();
  const state: {
    email: string;
  } = location.state as any;

  const {
    loginForm,
    showPassword,
    handleChange,
    handleSubmit,
    handleShowPasswordChange,
  } = useLogin(loginInitialForm(state?.email));

  return (
    <div className="container">
      <IonCard className="ion-card">
        <IonCardHeader className="center">
          <IonCardTitle>¡Bienvenido de nuevo!</IonCardTitle>
        </IonCardHeader>{" "}
        <br />
        <IonCardContent>
          <form onSubmit={handleSubmit}>
            <IonInput
              label="Usuario"
              labelPlacement="floating"
              fill="outline"
              name="username"
              type="text"
              value={loginForm.username}
              onIonChange={handleChange}
            />{" "}
            <br />
            <IonInput
              label="Contraseña"
              labelPlacement="floating"
              fill="outline"
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginForm.password}
              onIonChange={handleChange}
            />
            <IonItem>
              <IonCheckbox
                checked={showPassword}
                onIonChange={handleShowPasswordChange}
                justify="end"
              >
                Mostrar contraseña
              </IonCheckbox>
            </IonItem>
            <br />
            <IonButton expand="block" type="submit">
              Ingresar
            </IonButton>{" "}
            <br />
          </form>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
