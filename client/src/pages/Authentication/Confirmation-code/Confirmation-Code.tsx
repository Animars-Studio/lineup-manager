import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonGrid, IonIcon, IonInput,
    IonItem,
    IonRow,
} from '@ionic/react';
import './Confirmation-Code.css'
import { arrowBackCircleOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useConfirmationCode } from '../../../hooks/useConfirmationCode';




export const ConfirmationCode: React.FC = () => {
   
const location = useLocation()
const state: {
    email:string
    username: string;
} = location.state as any

const {
    authConfirmationInputs,
    handleSubmit,
    handleChange,
    onAuthConfirmationInputChange,
    onAuthConfirmationInputClear
} = useConfirmationCode({
    email: state?.email,
    username: state?.username
})

console.log('Consoleando estado >>>>>', state)
    const navigate = useHistory();
    const backNavigation = (): void => {
        navigate.push('/register')
    }


    return (
        <div className='container'>
            <IonCard className='ion-card'>

                <IonButton fill="clear" color="danger" onClick={backNavigation} >
                    <IonIcon slot="start" icon={arrowBackCircleOutline}></IonIcon>
                    Cancelar
                </IonButton><br />

                <IonCardHeader className='center'>
                    <IonCardTitle>Código de verificación</IonCardTitle>
                </IonCardHeader> <br />

                <IonCardContent>
                    <form onSubmit={handleSubmit}>

                        <IonGrid>
                            <IonRow>
                                {authConfirmationInputs.map((input, index) => {
                                    return (
                                        <IonCol key={input.id}>
                                            <IonInput
                                                ref={input.ref as any}
                                                value={input.value}
                                                className='ion-text-center parent'
                                                fill="outline"
                                                placeholder="-"
                                                maxlength={1}
                                                onKeyDown={(event) => {
                                                    return onAuthConfirmationInputClear(event, input)
                                                }}
                                                onIonInput={(event) => {
                                                    handleChange(input.id, event)
                                                    return onAuthConfirmationInputChange(input)
                                                }}
                                            />
                                        </IonCol>
                                    )
                                })}
                            </IonRow>
                        </IonGrid> <br />

                        <IonButton expand="block" type='submit' >Confirmar Administrador</IonButton> <br />
                    </form>

                </IonCardContent>

            </IonCard>
        </div>
    )
}