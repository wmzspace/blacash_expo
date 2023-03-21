import { ScreenRoute } from 'src/types'
import HomeScreen from '../pages/home'
import LoginScreen from '../pages/login'
import SignupScreen from '../pages/signup'

const routes: ScreenRoute[] = [
    {
        name: 'Home',
        component: HomeScreen,
        headerShown: false
    },
    {
        name: 'Login',
        component: LoginScreen,
        headerShown: false
    },
    {
        name: 'Signup',
        component: SignupScreen,
        headerShown: false
    }
]

export default routes