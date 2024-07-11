import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import { Register } from "./pages/Authentication/Register/Register";
import { Login } from "./pages/Authentication/Login/Login";
import { TenantRegister } from "./pages/Main/TenantRegister/TenantRegister";
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
import Page from "./pages/Page";
import { useEffect } from "react";
import { ApolloQueryResult, gql } from "@apollo/client";
import { ConfirmationCode } from "./pages/Authentication/Confirmation-code/Confirmation-Code";
import { ApolloClientService } from "./services/apolloClient.service";

//Practice component
import { ConfirmationCodeJs } from "./pages/Authentication/Confirmation-code/Confirmation-Code copy";

setupIonicReact();

const App: React.FC<any> = () => {
  const menuId = "main";

  useEffect(() => {
    const client = ApolloClientService.getInstance()
    client.query({
      query: gql`
     query{
     hello
     }
    `,
    })
      .then((result: ApolloQueryResult<string>) => {
        return result
      });
  }, [])
  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/confirmation-code" component={ConfirmationCode} />

            <IonSplitPane contentId="main">
              <Menu contentId="main" />
              <IonRouterOutlet id="main">
                {/** Replace with <Tenants /> component */}
                <Route path="/tenants" exact={true} component={() => {
                  return <>Tenants List</>
                }} />
                <Route path="/tenant-register/:id" component={TenantRegister} />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

export default App;
