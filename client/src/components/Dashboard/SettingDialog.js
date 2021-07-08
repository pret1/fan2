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
import { savePreference, getPreference } from "../../Services/Preference/Preference_Service";
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

export default function SettingDialog(props) {
    const {
        settingDialogOpen,
        dialogClose,
        loggedInUser
    } = props;

    const [preference, setPreference] = React.useState({
        theme: "",
        language: "",
    });

    const onMount = () => {
        getPreference(loggedInUser.username).then(resp => {
            if (resp.data.status === 200) {
                if (resp.data.userPreference.length !== 0){
                    setPreference(resp.data.userPreference[0]);
                }
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

    const saveSetting = () => {

        savePreference(preference).then(resp => {
            if (resp.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Worked Saved',
                    text: `Worked Saved Successfully.`,
                });
                handleClose();

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Please try again. Something went wrong.`,
                })
            }
        })
    };

    const handleChange = (event) => {
        setPreference({
            ...preference,
            [event.target.name]: event.target.value
        })
    };

    const handleClose = () => {
        dialogClose(true);
    };

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={settingDialogOpen}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Preferences
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl style={{ width: '100%', }} >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Theme
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={preference.theme}
                                    onChange={handleChange}
                                    displayEmpty
                                    name='theme'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Light'}>Light</MenuItem>
                                    <MenuItem value={'Dark'}>Dark</MenuItem>
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl style={{ width: '100%', }} >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Language
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={preference.language}
                                    onChange={handleChange}
                                    displayEmpty
                                    name='language'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'English'}>English</MenuItem>
                                    <MenuItem value={'Russian'}>Russian</MenuItem>
                                </Select>

                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={saveSetting} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}