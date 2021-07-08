import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { getUsers } from '../../Services/User/User_Service';
import Swal from 'sweetalert2';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AllWork from '../AllWork/AllWork';
import WorkDialog from './WorkDialog';
import SettingDialog from './SettingDialog';
import AdminDialog from './AdminDialog';
import ManageUserDialog from './ManageUserDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard(props) {

  const {
    loggedInUser,
    isUserAuthenticated,
  } = props;


  const classes = useStyles();
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [settingDialogOpen, setSettingDialogOpen] = React.useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = React.useState(false);
  const [selectedUserFromList, setSelectedUserFromList] = React.useState();
  const [manageUserDialog, setManageUserDialog] = React.useState(false);



  const onMyWorkClick = () => {
    setDialogOpen(true);
  };


  const onAdminClick = () => {
    setAdminDialogOpen(true);
  };

  const onSettingClick = () => {
    setSettingDialogOpen(true);
  };

  const onManageUserClick = () => {
    setManageUserDialog(true)
  };

  const dialogClose = (reload) => {
    setDialogOpen(false);
    setSettingDialogOpen(false);
    setAdminDialogOpen(false);
    if (reload) {
      window.location.reload(false)
    }

  };

  const selectedUser = (user) => {
    setSelectedUserFromList(user)
    setAdminDialogOpen(true);
  };

  const onMount = () => {
    isUserAuthenticated();
  };

  useEffect(onMount, []);

  return (
    <div className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loggedInUser.username !== null ?
            loggedInUser.username === 'admin' || loggedInUser.role === 'Admin'?
              <div>
                <Button variant="contained" onClick={onManageUserClick} color="primary" style={{ float: 'right', marginLeft: '10px' }}>
                  Manage Users
                </Button>
                <Button variant="contained" color="primary" onClick={onSettingClick} style={{ float: 'right', marginLeft: '10px' }}>
                  Settings
                </Button>
              </div>
              :
              <div>
                <Button variant="contained" onClick={onMyWorkClick} color="primary" style={{ float: 'right', marginLeft: '10px' }}>
                  My Work
                </Button>
                <Button variant="contained" color="primary" onClick={onSettingClick} style={{ float: 'right', marginLeft: '10px' }}>
                  Settings
                </Button>
              </div>
            : null}
        </Grid>
      </Grid>
      {dialogOpen ?
        <WorkDialog
          dialogClose={dialogClose}
          dialogOpen={dialogOpen}
          loggedInUser={loggedInUser}
        />
        : null
      }
      {settingDialogOpen ?
        <SettingDialog
          dialogClose={dialogClose}
          settingDialogOpen={settingDialogOpen}
          loggedInUser={loggedInUser}
        />
        : null
      }
      {
        adminDialogOpen ?
          <AdminDialog
            dialogClose={dialogClose}
            adminDialogOpen={adminDialogOpen}
            loggedInUser={loggedInUser}
            selectedUserFromList={selectedUserFromList}
          />
          : null
      }
      {
        manageUserDialog ?
          <ManageUserDialog
            dialogClose={dialogClose}
            manageUserDialog={manageUserDialog}
            loggedInUser={loggedInUser}
            selectedUserFromList={selectedUserFromList}
          />
          : null
      }
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AllWork
            loggedInUser={loggedInUser}
            selectedUser={selectedUser}
          />
        </Grid>
      </Grid>
    </div>
  );
}