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
