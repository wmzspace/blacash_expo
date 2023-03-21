export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  NotFound: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type ScreenRoute = {
  name: string
  component: any
  headerShown?: boolean
}