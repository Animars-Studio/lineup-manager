import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import React from "react";

export const TenantList: React.FC = () => {
    return (
        <div>
            <IonTabs>
                <IonRouterOutlet>
                </IonRouterOutlet>
                <IonTabBar slot="top">
                    <IonTabButton tab="south-tower" href="/tenant-register/1">
                        <IonLabel>Torre Sur</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="center-tower" href="/tenant-register/2">
                        <IonLabel>Torre Centro</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="north-tower" href="/tenant-register/3">
                        <IonLabel>Torre Norte</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </div>
    )
}