import { createStackNavigator } from '@react-navigation/stack'
import { Inavigation } from '../types'
import Home from '../pages/Home'
import Settings from '../pages/Settings'

function StackRouter() {
    const { Navigator, Screen } = createStackNavigator<Inavigation>()
    
    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name="Home" component={Home}/>
            <Screen name="Settings" component={Settings}/>
        </Navigator>
    )
}

export default StackRouter