import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Tasks from "../screens/tasks";

const PrivateRoutes = () => {
    const { Navigator, Screen} = createNativeStackNavigator();
    return (
        <Navigator screenOptions={{
            headerShown:false
        }}>
            <Screen name='tasks' component={Tasks}/>
        </Navigator>
    );
};


export default PrivateRoutes;
