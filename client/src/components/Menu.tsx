import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  eye,
  eyeOff,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useLocation } from "react-router";

//const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

type MenuProps = {
  contentId: string;
};

const menuItems = [
  {
    title: "Inquilinos",
    url: "/tenants",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Registrar Inquilino",
    url: "/tenant-register",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
];

const Menu: React.FC<MenuProps> = ({ contentId }) => {
  const location = useLocation();
  return (
    <IonMenu contentId={contentId} type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inquilinos</IonListHeader> <br />
          {menuItems.map(
            (
              { title: title, url: url, iosIcon: iosIcon, mdIcon: mdIcon },
              index
            ) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={location.pathname === url ? "selected" : ""}
                    routerLink={url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon
                      aria-hidden="true"
                      slot="start"
                      ios={iosIcon}
                      md={mdIcon}
                    />
                    <IonLabel>{title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            }
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
