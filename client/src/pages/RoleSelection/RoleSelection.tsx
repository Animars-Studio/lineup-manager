import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,IonItem,IonSelect,IonSelectOption,
} from '@ionic/react';
import { useRoleSelection } from '../../hooks/useRoleSelection'; 
import { Loader } from '../../components/Loader';

export interface ISelectRole {
    username: string;
    groupName:string;
  }

//Select role initial state
const selectRoleInitialForm: ISelectRole = {
    username: "",
    groupName:""
  };

export const RoleSelection: React.FC = () => {
  const { handleDisabled, handleChange, handleSubmit, roleForm, rolesList,loading } =
    useRoleSelection(selectRoleInitialForm);

  return (
    <div className="container">
      <IonCard className="ion-card">
        <IonCardHeader className="center">
          <IonCardTitle>Select your role</IonCardTitle>
        </IonCardHeader>{" "}
        <br />
        <form onSubmit={handleSubmit}>
          <IonCardContent>
            <IonItem>
              <IonSelect
                label="Select Role"
                labelPlacement="floating"
                placeholder="Select Role"
                name="groupName"
                value={roleForm.groupName}
                onIonChange={handleChange}
              >
                {rolesList.map((role, index) => (
                  <IonSelectOption key={index} value={role.groupName}>
                    {role.groupName}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <br />
            {loading &&
                            <IonCardHeader className="center">
                                <IonCardTitle>
                                    <Loader />
                                </IonCardTitle>
                            </IonCardHeader>}
            <IonButton expand="block" type="submit" disabled={handleDisabled()}>
              Confirm
            </IonButton>
            <br />
          </IonCardContent>
        </form>
      </IonCard>
    </div>
  );
};