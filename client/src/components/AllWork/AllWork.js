import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import logo from '../../logo.svg';
import image from '../../Images/Play.jpg';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/styles';
import Ratings from "../Ratings/Ratings";
import { getAllWork } from "../../Services/Work/Work_Service";
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    root: {

        '& .GridCells': {
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            backgroundColor: '#faebd7',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app.negative': {
            backgroundColor: '#faebd7',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app-theme--header': {
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
            '&:hover': {
                backgroundColor: '#faebd7',
              },
        },
    },
});






export default function AllWork(props) {
    const {
        loggedInUser,
        selectedUser
    } = props;

    const classes = useStyles();
    const [rows, setRows] = React.useState([]);

    const columns = [
        {
            field: "title",
            headerName: "Title",
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
            cellClassName: 'GridCells',
        },
        {
            field: "img",
            headerName: "Image",
            headerClassName: 'super-app-theme--header',
            flex: 0.27,
            cellClassName: 'GridCells',
            renderCell: (params) => {
                return (
                    <img src={image} />
                )

            }
        },
        {
            field: "description",
            headerName: "Description",
            headerClassName: 'super-app-theme--header',
            flex: 0.40,
            cellClassName: 'GridCells',
            renderCell: (params) => {
                return (
                    <Typography>{params.row.description}</Typography>
                )

            }
        },
        {
            field: "rating",
            headerName: "Rating",
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
            cellClassName: 'GridCells',

            renderCell: (params) => {
                return (
                    <Ratings row={params.row} rating={params.row.rating} loggedInUser={loggedInUser} selectedUser={selectedUser} />
                )
            }
        },
        {
            field: "author",
            headerName: "Author",
            headerClassName: 'super-app-theme--header',
            flex: 0.10,
            cellClassName: 'GridCells',
        },

    ];

    
    const onUserSelection = (user) =>{
        selectedUser(user)
    };

    const onMount = () => {
        getAllWork().then((resp) => {
            if (resp.data.status === 200) {
                setRows(resp.data.work);
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

    return (

        <div style={{ height: 400, width: "100%" }} className={classes.root}>
            <DataGrid
                rowHeight={300}
                autoHeight={true}
                rows={rows}
                columns={columns}
                disableSelectionOnClick={loggedInUser.username !== 'admin'}
                disableMultipleSelection={true}
                isRowSelectable={(params) => {
                    onUserSelection(params.row.username);
                }
                }
            />
        </div>
    );
}

