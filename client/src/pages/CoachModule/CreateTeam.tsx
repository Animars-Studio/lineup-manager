import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonIcon, IonInput, IonItem,
    IonSelect,
    IonSelectOption,

} from '@ionic/react';
import { useHistory } from "react-router-dom";
import { arrowBackCircleOutline } from 'ionicons/icons';
import { FormEvent, useEffect, useState } from 'react';
import { useCreateTeam } from '../../hooks/useCreateTeam'; 


//const imageUrl = 'https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg'

export interface ICreateTeam{
    teamName:string;
    country:string;
    logo?:string
}

//Select role initial state
const createTeamInitialForm:ICreateTeam = {
    teamName:'',
    country:'',
    logo:''
}

export const CreateTeam: React.FC = () => {
    
    const {
        handleDisabled,
        handleChange,
        handleSubmit,
        createTeamForm
    } = useCreateTeam(createTeamInitialForm)
    return (
        <div className='container'>
            <IonCard className='ion-card'>

                <IonCardHeader className='center'>
                    <IonCardTitle>Create your team</IonCardTitle>
                </IonCardHeader> <br />

                <form onSubmit={handleSubmit}>
                    <IonCardContent>

                    <IonInput
                            label="Team name"
                            labelPlacement="floating"
                            fill="outline"
                            name='teamName'
                            type='email'
                            value={createTeamForm.teamName}
                            onIonChange={handleChange}
                        /><br />
                        <IonItem>
                        <IonSelect 
                            label="Select Role" 
                            labelPlacement="floating" 
                            placeholder="Select country"
                            name='role'
                            value={createTeamForm.country}
                            onIonChange={handleChange}
                            >
                                <IonSelectOption value="coach">Coach</IonSelectOption>
                                <IonSelectOption value="player">Position player</IonSelectOption>
                            </IonSelect>
                        </IonItem><br />

                        <IonItem>
                            {/* <img src={imageUrl} alt="Team Logo" style={{ width: '100%', height: 'auto' }} /> */}
                            <input type="file" accept="image/*" onChange={()=>{}} />
                        </IonItem>


                        <IonButton expand="block" type='submit' disabled={handleDisabled()}>Save</IonButton> <br />
                    </IonCardContent>
                </form>

            </IonCard>
        </div>
    )
}