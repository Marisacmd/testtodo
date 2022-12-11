export default interface PrivateRouteProps {
  children: any;
  authenticated: boolean;
  redirectPath: string;
  onSuccessReturnChilden: boolean;
}
