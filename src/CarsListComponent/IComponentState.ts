export default interface IComponentState {
  carsList: any[];
  selectedCarId: string;
  showSnackbar: boolean;
  snackbarMessage: string;
  snackbarSeverity: 'success' | 'info' | 'warning' | 'error';
  carDetails: any; // TODO: car details model
  metrics: any; // TODO: telemetry model
}
