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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { getUsers, updateUsers } from "../../Services/User/User_Service";
import Swal from 'sweetalert2';
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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

export default function ManageUserDialog(props) {
    const {
        manageUserDialog,
        dialogClose,
        loggedInUser,
    } = props;


    const [userList, setUserList] = React.useState([]);
   
    const deleteClick = (row) => {
        setUserList(userList.filter(item => item.username !== row.username));
    };

    const handleChange = (row, e) => {
        userList.forEach((item) => {
            if(item.username === row.username){
                item['role'] = e.target.value
            }
        })
        setUserList(userList);
    };

    const handleEditCellChangeCommitted = (update) => {
        const { id, field, props} = update;

        userList.forEach((item) => {
            if(item.id === id){
                item[field] = props.value
            }
        })
        setUserList(userList);
    };

    const columns = [
        {
            field: "username",
            headerName: "User Name",
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
            cellClassName: 'GridCells',
            editable: true,
        },
        {
            field: "email",
            headerName: "Email",
            headerClassName: 'super-app-theme--header',
            flex: 0.27,
            cellClassName: 'GridCells',
            editable: true,
        },
        {
            field: "firstname",
            headerName: "First Name",
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
            cellClassName: 'GridCells',
            editable: true,
        },
        {
            field: "lastname",
            headerName: "Last Name",
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
            cellClassName: 'GridCells',
            editable: true,

        },
        {
            field: "role",
            headerName: "Role",
            headerClassName: 'super-app-theme--header',
            flex: 0.10,
            cellClassName: 'GridCells',
            editable: true,
            renderCell: (params) => {
                return (
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={params.row.role}
                        onChange={(e) => {handleChange(params.row, e)}}
                        displayEmpty
                        name='role'
                    >
                        <MenuItem value={'User'}>User</MenuItem>
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                    </Select>
                )
            }
        },
        {
            field: "action",
            headerName: "Action",
            headerClassName: 'super-app-theme--header',
            flex: 0.10,
            cellClassName: 'GridCells',
            renderCell: (params) => {
                return (
                    <div>
                        
                        <IconButton color="primary" aria-label="delete" onClick={() => deleteClick(params.row)} style={{ marginLeft: '5px' }}>
                            <DeleteOutlineIcon />
                        </IconButton>
                    </div>
                )

            }
        },

    ];

    const onMount = () => {
        getUsers().then(resp => {
            if (resp.data.status === 200) {
                setUserList(resp.data.users);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${resp.data.message}`,
                })
            }

        })
    };

    const saveChanges = () => {
        updateUsers(userList).then(resp => {
            if(resp.data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: `Data Updated Successfully.`,
                });
                dialogClose(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${resp.data.message}`,
                })
            }
        })
    };

    useEffect(onMount, []);



    const handleClose = () => {
        dialogClose(true);
    };

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={manageUserDialog}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Mangage User
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div style={{ height: 400, width: "100%" }} >
                                <DataGrid
                                    autoHeight={true}
                                    rows={userList}
                                    columns={columns}
                                    disableMultipleSelection={true}
                                    onEditCellChangeCommitted={handleEditCellChangeCommitted}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={saveChanges} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}