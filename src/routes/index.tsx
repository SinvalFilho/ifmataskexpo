import { NavigationContainer } from "@react-navigation/native";
import PrivateRoutes from "./private.routes";
import PublicRoutes from "./public.routes";

export default function Routes() {
    const user = null
  return (
    <NavigationContainer>
        {user ? <PrivateRoutes/> : <PublicRoutes/>}
    </NavigationContainer>
  );
}