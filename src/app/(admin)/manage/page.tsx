'use client';
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
  gridClasses,
} from '@mui/x-data-grid';

import useSWR from 'swr';
import axios from 'axios';

import wsrn from '../../../public/img/www.jpg';
import { useForm } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import moment from 'moment';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fade from '@mui/material/Fade';

import Layout from '@/app/components/layout';
import Auth from '@/app/components/auth';

const itemData: any = [];

export default function App() {
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const {
    data: show_data,
    error: show_data_error,
    isLoading: show_data_isLoading,
  } = useSWR('/api/shows', fetcher, {
    refreshInterval: 2000,
  });

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 120, editable: true },
    { field: 'dj', headerName: 'DJ', width: 80, editable: true },
    { field: 'description', headerName: 'Description', width: 150, editable: true },
    { field: 'img', headerName: 'Image Path', width: 200, editable: true },
    {
      field: 'dotw',
      headerName: 'day',
      width: 100,
      editable: true,
      valueFormatter: (value?: any) => {
        if (value == null) {
          return '';
        }
        return `${moment.weekdays(value)}`;
      },
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 150,
      editable: true,
      valueFormatter: (value?: any) => {
        if (value == null) {
          return '';
        }
        return `${value}`;
      },
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      width: 150,
      editable: true,
      valueFormatter: (value?: any) => {
        if (value == null) {
          return '';
        }
        return `${value}`;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [rows, setRows]: any = React.useState();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    console.log(id);
    //delete in sql
    // let row = rows.filter((row: any) => row.id !== id);

    const selectedRowData = show_data.filter((row: any) => id === row.id);
    let row = selectedRowData[0];
    console.log(row);

    axios
      .post('/api/delete_show', row)
      .then(function (response) {
        setShowSuccessDelete(true);
        setTimeout(() => {
          setShowSuccessDelete(false);
        }, 2000);
      })
      .catch(function (error) {
        alert('error');
      });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }

    //I guess still save
  };

  const processRowUpdate = (newRow: GridRowModel, OGRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log('OG: ' + OGRow);
    console.log('NEW: ' + updatedRow);

    //SQL shit
    //setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    let data = { OGRow, updatedRow };
    axios
      .put('/api/shows', data)
      .then(function (response) {
        console.log(response);
        setShowSuccessCreate(true);
        setTimeout(() => {
          setShowSuccessCreate(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
        alert('error');
      });

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [showSuccessCreate, setShowSuccessCreate]: any = useState(false);
  const [showSuccessDelete, setShowSuccessDelete]: any = useState(false);

  const [currentlySelectedShow, setCurrentlySelectedShow]: any = useState({});
  //const [formData, setFormData]: any = useState({});
  const { register, handleSubmit } = useForm();
  const [file, setFile]: any = useState('');
  const [startTime, setST]: any = useState(moment());
  const [endTime, setET]: any = useState(moment());

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleSkip = () => {
    axios.get('/api/admin').then((response) => {
      console.log(response);
    });
  };

  const handleComplete = (showData: any) => {
    const form: any = document.getElementById('form');
    //const fileInput: any = document.getElementById('fileInput'); // Replace with your HTML element ID
    //const file = fileInput.files[0];

    showData.startTime = startTime.toISOString();
    showData.endTime = endTime.toISOString();

    if (file) {
      console.log('FILE');
      let fileType = file.type.split('/').pop();
      const formData = new FormData();
      const fileName =
        moment(showData.startTime).year() +
        '_' +
        showData.title.toLowerCase().trim() +
        '_' +
        showData.dj.trim().toLowerCase().replaceAll(' ', '_') +
        '.' +
        fileType;

      formData.append('file', file, fileName);
      formData.append('year', String(moment(showData.startTime).year()));

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

      showData.img = fileName;
      console.log('SHOWDATA');
      console.log(showData);

      axios
        .post('/api/shows', showData)
        .then(function (response) {
          console.log(response);
          form.reset();
          setFile('');
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
          alert('error');
        });
    } else {
      showData.img = 'wsrn2.png';
      axios
        .post('/api/shows', showData)
        .then(function (response) {
          console.log(response);
          form.reset();
          setFile('');
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
          alert('error');
        });
    }
  };

  return (
    <Layout title="Manage">
      <Fade in={showSuccessCreate}>
        <Box sx={{ width: '20%', position: 'absolute', top: '15%', right: '40%' }}>
          <Alert variant="outlined" severity="success">
            Entry Updated!
          </Alert>
        </Box>
      </Fade>
      <Fade in={showSuccessDelete}>
        <Box sx={{ width: '20%', position: 'absolute', top: '15%', right: '40%' }}>
          <Alert variant="outlined" severity="success">
            Entry Deleted!
          </Alert>
        </Box>
      </Fade>

      <Container sx={{ overflowX: 'hidden' }}>
        <Dialog
          component="form"
          id="form"
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit((data) => handleComplete(data))}
        >
          <Box>
            <Grid container alignContent={'center'} spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12}>
                <DialogTitle>
                  {' '}
                  <Typography variant="h4" textAlign="center">
                    {' '}
                    New Show
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <Divider variant="middle"></Divider>
              </Grid>

              <Grid
                container
                alignContent={'center'}
                justifyContent={'center'}
                spacing={2}
                sx={{ p: 5 }}
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('title')}
                    id="show-name"
                    label="Show Name"
                    variant="outlined"
                    sx={{}}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('dj')}
                    id="dj"
                    label="DJ"
                    variant="outlined"
                    sx={{}}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...register('description')}
                    sx={{}}
                    fullWidth
                    id="description"
                    label="Description"
                    variant="outlined"
                    rows={4}
                    multiline
                    required
                  />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      sx={{ width: '100%' }}
                      {...register('startTime')}
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) => {
                        setST(newValue), console.log(newValue);
                      }}
                      name="startTime"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      sx={{ width: '100%' }}
                      {...register('endTime')}
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => setET(newValue)}
                      name="endTime"
                    />
                  </Grid>
                </LocalizationProvider>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Day of the Week</InputLabel>
                  <Select
                    required
                    {...register('dotw')}
                    id="day-of-the-week"
                    label="Day of the Week"
                    fullWidth
                  >
                    <MenuItem value={0}>Sunday</MenuItem>
                    <MenuItem value={1}>Monday</MenuItem>
                    <MenuItem value={2}>Tuesday</MenuItem>
                    <MenuItem value={3}>Wednesday</MenuItem>
                    <MenuItem value={4}>Thursday</MenuItem>
                    <MenuItem value={5}>Friday</MenuItem>
                    <MenuItem value={6}>Saturday</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Button
                    sx={{ mt: 5 }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      id="fileInput"
                      type="file"
                      onChange={() => {
                        const fileInput: any = document.getElementById('fileInput'); // Replace with your HTML element ID
                        const file = fileInput.files[0];
                        setFile(file);
                      }}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {file != null ? <Typography>{file.name}</Typography> : null}
                </Grid>
              </Grid>
            </Grid>
            <DialogActions sx={{ mb: 2, mr: 5 }}>
              <Button type="submit" size="large">
                Submit
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        <Grid container justifyContent="space-between">
          <Grid item>
            <Button onClick={handleClickOpen}>New Show</Button>
            <Button onClick={handleSkip}>SKIP</Button>
          </Grid>
          <Grid item>
            <Auth></Auth>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: '2%',
            height: '70vh',
            width: '100%',
          }}
        >
          <Grid container direction="row" justifyContent="center" spacing={10}>
            <Grid item xs={12}>
              {!show_data_isLoading ? (
                <DataGrid
                  editMode="row"
                  rows={show_data}
                  columns={columns}
                  getRowHeight={() => 'auto'}
                  onRowSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = show_data.filter((row: any) => selectedIDs.has(row.id));
                    setCurrentlySelectedShow(selectedRowData[0]);
                    console.log(selectedRowData);
                  }}
                  sx={{
                    height: '58vh',
                    [`& .${gridClasses.cell}`]: {
                      py: 1,
                    },
                  }}
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={(updatedRow, originalRow) =>
                    processRowUpdate(updatedRow, originalRow)
                  }
                />
              ) : (
                <DataGrid columns={columns} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
}
