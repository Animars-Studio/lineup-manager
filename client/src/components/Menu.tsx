import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import { homeOutline, homeSharp } from "ionicons/icons";
import "./Menu.css";
import { useLocation } from "react-router";

type MenuProps = {
  contentId: string;
};

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
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
