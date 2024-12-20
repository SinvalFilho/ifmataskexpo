import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";



const PublicRoutes = () => {
    const { Navigator, Screen } = createNativeStackNavigator();
    return (
        <Navigator>
            <Screen 
                name="Login" 
                component={Login} 
                options={{ headerShown: false }}
            />
        </Navigator>
    );
};

export default PublicRoutes;
