import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import Menu from "./components/Menu";
import { Register } from "./pages/Authentication/Register/Register";
import { Login } from "./pages/Authentication/Login/Login";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect } from "react";
import { ConfirmationCode } from "./pages/Authentication/Confirmation-code/Confirmation-Code";
import { CreateTeam } from "./pages/CoachModule/CreateTeam";
import { RoleSelection } from "./pages/RoleSelection/RoleSelection";
import { Dashboard } from "./pages/Dashboard/Dashboard";

setupIonicReact();

const App: React.FC<any> = () => {
  const menuId = "main";

  useEffect(() => {
    console.log("[App] component mounted");
  }, []);
  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/confirmation-code" component={ConfirmationCode} />
            <Route path="/role-selection" component={RoleSelection} />
            <Route path="/create-team" component={CreateTeam} />
            <Route path="/dashboard" component={Dashboard} />

          
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

export default App;
