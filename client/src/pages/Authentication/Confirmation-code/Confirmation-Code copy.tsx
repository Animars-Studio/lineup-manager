import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonCol, IonGrid, IonIcon, IonInput,
    IonItem,
    IonRow,
} from '@ionic/react';
import './Confirmation-Code.css'
import { arrowBackCircleOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useConfirmationCode } from '../../../hooks/useConfirmationCode';




export const ConfirmationCodeJs: React.FC = () => {

    const [inputs, setInputs] = useState([
        { id: 1, value: '', ref: useRef()},
        { id: 2, value: '', ref: useRef()},
        { id: 3, value: '', ref: useRef()},
        { id: 4, value: '', ref: useRef()},
        { id: 5, value: '', ref: useRef()},
        { id: 6, value: '', ref: useRef()},
    ])

    const handleChange = (id: number, value: number | string) => {
            setInputs((prevState)=>{
                return [
                    ...prevState.map((input)=>{
                        if(input.id === id){
                            input.value = value as string
                        }
                        return input
                    })
                ]
            })
    }

    const setFocus = () =>{
        const defaultInput = inputs.at(0)
        if(defaultInput?.id === 1){
            //defaultInput.id.setFocus()
        }
    }

    //Memorize an type of data, object, array, number string etc...
    // const inputs = useMemo(() => {
    //     return [
    //         { id: 1 },
    //         { id: 2 },
    //         { id: 3 },
    //         { id: 4 },
    //         { id: 5 },
    //         { id: 6 },
    //     ];
    // }, [])

    //Memorize a function
    // const loop = useCallback(()=>{
    //         for(let i = 0; i < inputs.length; i++){
    //             console.log(inputs[i])
    //         }
    // },[])


    useEffect(() => {
        setFocus()
    }, [])

    return (
        <div className='container'>
            <IonCard className='ion-card'>

                <IonButton fill="clear" color="danger" onClick={() => { }} >
                    <IonIcon slot="start" icon={arrowBackCircleOutline}></IonIcon>
                    Cancelar
                </IonButton><br />

                <IonCardHeader className='center'>
                    <IonCardTitle>Código de verificación</IonCardTitle>
                </IonCardHeader> <br />

                <IonCardContent>
                    <form onSubmit={() => { }}>

                        <IonGrid>
                            <IonRow>
                                {inputs.map((input) => {
                                    return (
                                        <IonCol key={input.id}>
                                            <IonInput
                                                className='ion-text-center parent'
                                                fill="outline"
                                                placeholder="-"
                                                maxlength={1}
                                                type='number'
                                                ref={input.ref as any}
                                                // onIonFocus={() =>{setFocus(input.id)}}
                                                onIonChange={(e) => {
                                                    if (e.target.value) {
                                                        handleChange(input.id, e.target.value as number)
                                                    }
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
        </div >
    )
}