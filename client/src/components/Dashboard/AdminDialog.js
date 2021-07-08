import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import UploadFiles from '../UploadFile/Upload-Files';
import { getUserWork, saveWork } from '../../Services/Work/Work_Service';
import Swal from 'sweetalert2';

import Grid from '@material-ui/core/Grid';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AdminDialog(props) {
  const {
    adminDialogOpen,
    dialogClose,
    loggedInUser,
    selectedUserFromList
  } = props;


  const [userWork, setUserWork] = React.useState({
    title: '',
    description: '',
    rating: 5,
  });
  
  const handleClose = () => {
    dialogClose(true);
  };

  const onMount = () => {
    getUserWork(selectedUserFromList).then(resp => {
      if (resp.data.status === 200) {
        setUserWork(resp.data.userWork[0]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${resp.data.message}`,
        })
      }

    })
  };

  const onUserDetailChange = (e) => {
    setUserWork({
      ...userWork,
      [e.target.name]: e.target.value
    })
  }

  const onSaveChange = () => {
      userWork.author = 'Admin';
      console.log(userWork);
    saveWork(userWork).then(resp => {
      if (resp.data.status === 200) {
        dialogClose(true);
        Swal.fire({
          icon: 'success',
          title: 'Worked Saved',
          text: `Worked Saved Successfully.`,
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Please try again. Something went wrong.`,
        })
      }
    })
  }

  useEffect(onMount, [selectedUserFromList]);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={adminDialogOpen}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Admin Update Work
        </DialogTitle>
        <DialogContent dividers>
          <UploadFiles />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                variant = 'outlined'
                value={userWork.title}
                onChange={onUserDetailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              variant='outlined'
                multiline
                rows={4}
                name="description"
                fullWidth
                id="description"
                label="Description"
                value={userWork.description}
                onChange={onUserDetailChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSaveChange} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}