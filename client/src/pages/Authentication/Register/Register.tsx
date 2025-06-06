import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonIcon, IonInput, IonItem,

} from '@ionic/react';
import { useRegister } from '../../../hooks/useRegister';
import { IRegister } from './Register.interface';
import { useHistory } from "react-router-dom";
import {arrowBackCircleOutline} from 'ionicons/icons';

// Register form initial state
const registerInitialForm: IRegister = {
    email: 'dicky5217@gmail.com',
    password: 'Admin123@'
}

export const Register: React.FC = () => {

    const navigate = useHistory();
    const backNavigation = (): void => {
        navigate.push('/login')
    }

    const {
        registerForm,
        showPassword1,
        handleChange,
        handleShowPasswordChange1,
        handleSubmit
    } = useRegister(registerInitialForm);

    return (
        <div className='container'>
            <IonCard className='ion-card'>

                
                <IonButton fill="clear" onClick={backNavigation} >
                    <IonIcon slot="start" icon={arrowBackCircleOutline}></IonIcon>
                    Regresar
                </IonButton><br />

                <IonCardHeader className='center'>
                    <IonCardTitle>Registrar administrador</IonCardTitle>
                </IonCardHeader> <br />

                <form onSubmit={handleSubmit}>
                    <IonCardContent>
                        <IonInput
                            label="Email"
                            labelPlacement="floating"
                            fill="outline"
                            name='email'
                            type='email'
                            value={registerForm.email}
                            onIonChange={handleChange}
                        /><br />

                        <IonInput
                            type={showPassword1 ? 'text' : 'password'}
                            label="Contraseña"
                            labelPlacement="floating"
                            fill="outline"
                            name='password'
                            value={registerForm.password}
                            onIonChange={handleChange}
                        />

                        <IonItem>
                            <IonCheckbox
                                checked={showPassword1}
                                onIonChange={handleShowPasswordChange1}
                                slot="end">Mostrar contraseña</IonCheckbox>
                        </IonItem><br />

                        <IonButton expand="block" type='submit'>Registrar</IonButton> <br />
                    </IonCardContent>
                </form>

            </IonCard>
        </div>
    )
}