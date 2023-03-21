import HomeScreen from '../pages/home'
import LoginScreen from '../pages/login'
import SignupScreen from '../pages/signup'

const routes: any[] = [
    {
        name: 'Home',
        component: HomeScreen,
    },
    {
        name: 'Login',
        component: LoginScreen,
    },
    {
        name: 'Signup',
        component: SignupScreen,
    }
]

export default routes