import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useEffect } from "react";

export const Dashboard: React.FC = () => {
    useEffect(() => {
        // Aqui es donde verificamos el role del usuario
        // si es COACH y no tiene un TEAM le mostramos un component
        // para que cree un team
        // si es PLAYER y no tiene un TEAM le mostramos un component
        // para que se una a un team o el team info si ya tiene un team
    }, []);
  return (
    <div className="container">
      <IonCard className="ion-card">
        <IonCardHeader className="center">
          <IonCardTitle>Inición sesiada</IonCardTitle>
          <IonCardTitle>:D</IonCardTitle>
        </IonCardHeader>{" "}
        <br />
      </IonCard>
    </div>
  );
};
