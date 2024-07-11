import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonSelect,
  IonSelectOption,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React, { useEffect } from "react";
import { ITenant } from "./TenantRegister.interface";
import { useTenantRegister } from "../../../hooks/useTenantRegister";
import "./TenantRegister.css";
import { person, call, settings } from "ionicons/icons";
import { Route, useLocation, useParams } from "react-router";

const tenantInitialForm: ITenant = {
  firstName: "",
  middleName: "",
  lastName: "",
  secondLastName: "",
  building: "",
  apartment: "",
};

const buildings = ["Torre norte", "Torre Centro", "Torre Sur"];
const apartments = ["1C", "2C", "3C"];

export const TenantRegister: React.FC = () => {
  const { tenantForm, handleChange, handleNavigation, handleSubmit } =
    useTenantRegister(tenantInitialForm);

  const location = useLocation();

  const params = useParams<{ id: string }>();
  // const Query = () => {
  //   return new URLSearchParams(useLocation().search);
  // };

  //console.log("Logueo id", id)

  useEffect(() => {
    console.log(params.id)
  },[params])

  return (
    <IonCard>
      <IonCardHeader className="center">
        <IonCardTitle>Registrar inquilino</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <form onSubmit={handleSubmit} className="grid-container">
          <IonInput
            className="name"
            label="Primer Nombre"
            labelPlacement="floating"
            fill="outline"
            name="username"
            type="text"
            value={tenantForm.firstName}
            onIonChange={handleChange}
          />
          <IonInput
            className="middleName"
            label="Segundo Nombre"
            labelPlacement="floating"
            fill="outline"
            name="password"
            type="text"
            value={tenantForm.middleName}
            onIonChange={handleChange}
          />
          <IonInput
            className="lastName"
            label="Primer Apellido"
            labelPlacement="floating"
            fill="outline"
            name="password"
            type="text"
            value={tenantForm.lastName}
            onIonChange={handleChange}
          />
          <IonInput
            className="secondLastName"
            label="Segundo Apellido"
            labelPlacement="floating"
            fill="outline"
            name="password"
            type="text"
            value={tenantForm.secondLastName}
            onIonChange={handleChange}
          />
          <IonItem className="building">
            <IonSelect label="Edificio" labelPlacement="floating">
              {buildings.map((building) => {
                // add a unique key to each element
                return (
                  <IonSelectOption key={building} value={building}>
                    {building}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
          <IonItem className="apartment">
            <IonSelect label="Apartamento" labelPlacement="floating">
              {apartments.map((apartment) => {
                return (
                  <IonSelectOption key={apartment} value={apartment}>
                    {apartment}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>{" "}
          <br /> <br />
          <IonButton expand="block" type="submit" className="register-btn">
            REGISTRAR
          </IonButton>{" "}
          <br />
        </form>
      </IonCardContent>
    </IonCard>
  );
};
