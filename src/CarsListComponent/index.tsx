// Core
import { Component } from 'react';
import {
  FormControl,
  InputLabel,
  withStyles,
  Select,
  Snackbar,
  FormHelperText
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import moment from 'moment';

// App specific
import CarTelemetryComponent from '../CarTelemetryComponent';
import IComponentState from './IComponentState';
import RestAPI from '../API';
import styles from './styles';

const initialMetrics = {
  battery_level: 0,
  cpu_usage: 0,
  lat: 0,
  lng: 0,
  speed: 0,
  timestamp: moment.now(),
  vehicle_id: ''
}

export class CarsListComponent extends Component<any, IComponentState> {
  interval: any;
  constructor(props: any) {
    super(props);
    this.state = {
      carsList: [],
      selectedCarId: '',
      showSnackbar: false,
      snackbarMessage: '',
      snackbarSeverity: 'info',
      carDetails: {
        color: '',
        id: '',
        name: '-',
        plate_number: '-'
      },
      metrics: initialMetrics
    }
  }

  public componentDidMount() {
    RestAPI.getCarsList().then((res) => {
      if (res.status === 200) {
        const carsList = res.data;
        carsList.sort((a: any, b: any) => a.name < b.name ? - 1 : Number(a.name > b.name));
        this.setState({carsList: carsList});
      }
    }).catch((error) => {
      console.error('Failed to fetch cars list \n', error);
      this.setState({
        snackbarMessage: 'Failed to fetch cars list',
        snackbarSeverity: 'error',
        showSnackbar: true
      });
    });
  }

  public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IComponentState>, snapshot?: any) {
    const { selectedCarId } = this.state;

    if (prevState.selectedCarId !== selectedCarId && selectedCarId !== '') {
      this.getCarDetails(selectedCarId);
      if (this.interval) {
        clearInterval(this.interval);
        this.getMetrics();
      }
      this.interval = setInterval(this.getMetrics, 2800);
    }
  }

  handleChange = (event: any) => {
    const name = event.target.name;
    this.setState((prevState) => ({
      ...prevState,
      [name]: event.target.value
    }));
  }

  getCarDetails = (carId: string) => {
    RestAPI.getCarDetails(carId).then((res) => {
      if (res.status === 200) {
        this.setState({carDetails: res.data});
      }
    }).catch((error) => {
      this.setState({
        snackbarMessage: 'Failed to fetch car details',
        snackbarSeverity: 'error',
        showSnackbar: true
      });
    });
  }

  getMetrics = () => {
    const {selectedCarId} = this.state;
    if (selectedCarId) {
      RestAPI.getCarTelemetry(selectedCarId).then((res) => {
        if (res.status === 200) {
          console.log('res', res);
          this.setState({metrics: res.data});
        }
      }).catch((error) => {
        this.setState({
          snackbarMessage: 'Failed to fetch car telemetry',
          snackbarSeverity: 'error',
          showSnackbar: true
        });
      });
    }
  }

  closeSnackbar = () => {
    this.setState({showSnackbar: false});
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    const { classes } = this.props;
    const { selectedCarId, showSnackbar, snackbarMessage, snackbarSeverity, carsList, carDetails, metrics } = this.state;

    const Alert = (props: AlertProps) => {
      return <MuiAlert classes={{ filledSuccess: classes.alert }} elevation={6} variant='filled' {...props} />;
    }

    const snackbar = (showSnackbar) ? <><Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} autoHideDuration={3000} onClose={this.closeSnackbar} open={showSnackbar}
    ><Alert severity={snackbarSeverity}>{snackbarMessage}</Alert></Snackbar></> : <></>;

    const carTelemetry = (selectedCarId !== '') ? <CarTelemetryComponent details={carDetails} metrics={metrics} /> : <></>;

    return (<div className={classes.formWrapper}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-car-select">Car</InputLabel>
        <Select
          native
          value={selectedCarId}
          onChange={this.handleChange}
          label="Car"
          inputProps={{
            name: 'selectedCarId',
            id: 'outlined-car-select',
          }}
        >
          <option aria-label="None" value="" />
          {carsList.map((car: any, key: any) =>
            <option key={key} value={car.id}> {car.name} - {car.plate_number}</option>
          )}
        </Select>
        <FormHelperText>Select Vehicle to get metrics</FormHelperText>
      </FormControl>
      {carTelemetry}
      {snackbar}
    </div>);
  }
}

export default withStyles(styles)(CarsListComponent);
