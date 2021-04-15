// Core
import { Component } from 'react';
import { withStyles } from '@material-ui/core';
import MemoryIcon from '@material-ui/icons/Memory';
import BatteryStdIcon from '@material-ui/icons/BatteryStd';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck'
import moment from 'moment';

// App specific
import styles from './styles';

export class CarTelemetryComponent extends Component<any, any> {
  getBorderColor = (cpu: number): string => {
    const { classes } = this.props;
    if (cpu <= 75) {
      return `${classes.greenBorder}`;
    } else if( cpu >= 76 && cpu <= 90) {
      return `${classes.yellowBorder}`;
    } else {
      return `${classes.redBorder}`;
    }
  }

  getBackgroundColor = (percentage: number) : string => {
    const { classes } = this.props;
    if (percentage <= 75) {
      return `${classes.okState}`;
    } else if( percentage >= 76 && percentage <= 90) {
      return `${classes.warningState}`;
    } else {
      return `${classes.criticalState}`;
    }
  }

  public render() {
    const { classes, details, metrics } = this.props;

    return <div className={`${classes.container} ${this.getBorderColor(metrics.cpu_usage)}`}>
      <div className={classes.carDetails}>
        <div>
          <p className={classes.carName}>{details.name}</p>
        </div>
        <div className={classes.element}>
          Plate #: {details.plate_number}
        </div>
        <div className={classes.element}>
          {moment(metrics.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
        </div>
        <div className={classes.element}>
          lng {metrics.lng}
        </div>
        <div className={classes.element}>
          lat {metrics.lat}
        </div>
      </div>
      <div className={classes.statusBar}>
        <div className={classes.telemetry}>
          {metrics.speed} mph
          <NetworkCheckIcon className={classes.statusIcon} />
        </div>
        <div className={`${classes.telemetry} ${this.getBackgroundColor(metrics.cpu_usage)}`}>
          {metrics.cpu_usage}
          <MemoryIcon className={classes.statusIcon} />
        </div>
        <div className={`${classes.telemetry} ${this.getBackgroundColor(metrics.battery_level)}`}>
          {metrics.battery_level}
          <BatteryStdIcon className={classes.statusIcon} />
        </div>
      </div>
    </div>
  }
}

export default withStyles(styles)(CarTelemetryComponent);
