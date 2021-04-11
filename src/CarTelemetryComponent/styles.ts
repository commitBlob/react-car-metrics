import { Theme, createStyles, } from '@material-ui/core';

export default (theme: Theme) => createStyles({
  container: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '.5em',
    border: 'solid 3px blue',
    display: 'flex',
    flexFlow: 'column',
    width: '350px',
    margin: '1em .5em'
  },
  carDetails: {
    display: 'flex',
    flexFlow: 'column',
    padding: '1em'
  },
  element: {
    padding: '.5em 0'
  },
  statusBar: {
    display: 'flex',
    flexFlow: 'row'
  },
  telemetry: {
    flex: 1,
    textAlign: 'center',
    borderTop: 'solid 2px #dcdde1',
    minHeight: '30px',
    lineHeight: '24px',
    padding: '.5em 0'
  },
  carName: {
    color: theme.palette.info.main,
    fontSize: '1.2em',
    fontWeight: 'bold'
  },
  greenBorder: {
    borderColor:  theme.palette.success.main
  },
  yellowBorder: {
    borderColor: theme.palette.warning.main
  },
  redBorder: {
    borderColor: theme.palette.error.main
  },
  statusIcon: {
    display: 'inline-flex',
    verticalAlign: 'top',
    padding: '0 .2em'
  },
  okState: {
    backgroundColor: theme.palette.success.main
  },
  warningState: {
    backgroundColor: theme.palette.warning.main
  },
  criticalState: {
    backgroundColor: theme.palette.error.main
  }
});
