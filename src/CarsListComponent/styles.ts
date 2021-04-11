import { Theme, createStyles, } from '@material-ui/core';

export default (theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formWrapper: {
    margin: '1em'
  }
});
