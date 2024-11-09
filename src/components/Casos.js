import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Select, MenuItem, InputLabel, FormControl, Grid, Chip } from '@mui/material';
import Sidebar from './Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Datos de ejemplo para los casos
const initialCasos = [
  { numero: 1, status: 'Abierto', descripcion: 'Problema con la transferencia', detalles: 'No se puede realizar transferencia internacional', tipo: 'Solicitud', severidad: 'HIGH', fecha: '2023-01-10', cliente: 'Juan Pérez', dni: '12345678' },
  { numero: 2, status: 'En Proceso', descripcion: 'Error en cajero automático', detalles: 'Cajero retuvo tarjeta', tipo: 'Incidencia', severidad: 'MEDIUM', fecha: '2023-02-15', cliente: 'María García', dni: '23456789' },
  { numero: 3, status: 'Cerrado', descripcion: 'Consulta sobre cuenta de ahorro', detalles: 'Intereses no reflejados', tipo: 'Consulta', severidad: 'LOW', fecha: '2023-03-20', cliente: 'Carlos López', dni: '34567890' }
];

// Mapeo de colores de severidad
const severidadColors = {
  HIGHEST: '#d32f2f', // Red 700
  HIGH: '#f57c00',    // Orange 700
  MEDIUM: '#fbc02d',  // Yellow 700
  LOW: '#388e3c'      // Green 700
};

// Mapeo de colores de status
const statusColors = {
  Abierto: '#388e3c',  // Green 700
  Cerrado: '#616161',  // Gray 700
  'En Proceso': '#1976d2'  // Blue 700
};

const Casos = () => {
  const [casos, setCasos] = useState([]);
  const [selectedCaso, setSelectedCaso] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [filterCliente, setFilterCliente] = useState('');
  const [filterDNI, setFilterDNI] = useState('');
  const [filterFecha, setFilterFecha] = useState('');
  const [filterTicket, setFilterTicket] = useState('');

  useEffect(() => {
    fetchCasos();
  }, []);

  const fetchCasos = async () => {
    try {
      const response = await axios.get('/api/casos');
      setCasos(response.data);
    } catch (error) {
      console.error('Error fetching casos:', error);
    }
  };

  const handleView = (caso) => {
    setSelectedCaso(caso);
    setOpenViewDialog(true);
  };

  const handleEdit = (caso) => {
    setSelectedCaso(caso);
    setOpenEditDialog(true);
  };

  const handleDelete = async (numero) => {
    try {
      await axios.delete(`/api/casos/${numero}`);
      fetchCasos();
    } catch (error) {
      console.error('Error deleting caso:', error);
    }
  };

  const handleAdd = () => {
    setSelectedCaso({
      numero: casos.length + 1,
      status: '',
      descripcion: '',
      detalles: '',
      tipo: '',
      severidad: '',
      fecha: '',
      cliente: '',
      dni: ''
    });
    setOpenAddDialog(true);
  };

  const handleSave = async () => {
    try {
      if (openEditDialog) {
        await axios.put(`/api/casos/${selectedCaso.numero}`, selectedCaso);
      } else {
        await axios.post('/api/casos', selectedCaso);
      }
      fetchCasos();
      handleClose();
    } catch (error) {
      console.error('Error saving caso:', error);
    }
  };

  const handleClose = () => {
    setOpenViewDialog(false);
    setOpenEditDialog(false);
    setOpenAddDialog(false);
    setSelectedCaso(null);
  };

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text("Casos", 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Número de Ticket', 'Status', 'Descripción', 'Detalles del Sistema', 'Tipo de Solicitud', 'Severidad', 'Fecha de Creación', 'Cliente', 'DNI']],
      body: casos.map(caso => [caso.numero, caso.status, caso.descripcion, caso.detalles, caso.tipo, caso.severidad, new Date(caso.fecha).toLocaleDateString(), caso.cliente, caso.dni])
    });
    doc.save('casos.pdf');
  };

  const filteredCasos = casos.filter(caso => 
    (filterCliente === '' || caso.cliente.toLowerCase().includes(filterCliente.toLowerCase())) &&
    (filterDNI === '' || caso.dni.includes(filterDNI)) &&
    (filterFecha === '' || caso.fecha === filterFecha) &&
    (filterTicket === '' || caso.numero.toString().includes(filterTicket))
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Gestión de Casos
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAdd} sx={{ color: 'white' }}>
              Añadir Caso
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleExport} sx={{ color: 'white' }}>
              Exportar Caso
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Filtrar por Cliente"
              variant="outlined"
              fullWidth
              value={filterCliente}
              onChange={(e) => setFilterCliente(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Filtrar por DNI"
              variant="outlined"
              fullWidth
              value={filterDNI}
              onChange={(e) => setFilterDNI(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Filtrar por Fecha"
              type="date"
              variant="outlined"
              fullWidth
              value={filterFecha}
              onChange={(e) => setFilterFecha(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Filtrar por Número de Ticket"
              variant="outlined"
              fullWidth
              value={filterTicket}
              onChange={(e) => setFilterTicket(e.target.value)}
            />
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Número de Ticket</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Detalles del Sistema</TableCell>
                <TableCell>Tipo de Solicitud</TableCell>
                <TableCell>Severidad</TableCell>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCasos.map((caso) => (
                <TableRow key={caso.numero}>
                  <TableCell>{caso.numero}</TableCell>
                  <TableCell>
                    <Chip label={caso.status} style={{ backgroundColor: statusColors[caso.status], color: 'white' }} />
                  </TableCell>
                  <TableCell>{caso.descripcion}</TableCell>
                  <TableCell>{caso.detalles}</TableCell>
                  <TableCell>{caso.tipo}</TableCell>
                  <TableCell style={{ color: severidadColors[caso.severidad] }}>{caso.severidad}</TableCell>
                  <TableCell>{caso.fecha}</TableCell>
                  <TableCell>{caso.cliente}</TableCell>
                  <TableCell>{caso.dni}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(caso)} size="small">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(caso)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(caso.numero)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openViewDialog} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Ver Caso</DialogTitle>
          <DialogContent>
            {selectedCaso && (
              <>
                <Typography variant="body1"><strong>Número de Ticket:</strong> {selectedCaso.numero}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {selectedCaso.status}</Typography>
                <Typography variant="body1"><strong>Descripción:</strong> {selectedCaso.descripcion}</Typography>
                <Typography variant="body1"><strong>Detalles del Sistema:</strong> {selectedCaso.detalles}</Typography>
                <Typography variant="body1"><strong>Tipo de Solicitud:</strong> {selectedCaso.tipo}</Typography>
                <Typography variant="body1"><strong>Severidad:</strong> {selectedCaso.severidad}</Typography>
                <Typography variant="body1"><strong>Fecha de Creación:</strong> {selectedCaso.fecha}</Typography>
                <Typography variant="body1"><strong>Cliente:</strong> {selectedCaso.cliente}</Typography>
                <Typography variant="body1"><strong>DNI:</strong> {selectedCaso.dni}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cerrar</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEditDialog || openAddDialog} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{openEditDialog ? 'Editar Caso' : 'Añadir Caso'}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={selectedCaso ? selectedCaso.status : ''}
                onChange={(e) => setSelectedCaso({ ...selectedCaso, status: e.target.value })}
              >
                <MenuItem value="Abierto">Abierto</MenuItem>
                <MenuItem value="Cerrado">Cerrado</MenuItem>
                <MenuItem value="En Proceso">En Proceso</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Descripción"
              type="text"
              fullWidth
              value={selectedCaso ? selectedCaso.descripcion : ''}
              onChange={(e) => setSelectedCaso({ ...selectedCaso, descripcion: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Detalles del Sistema"
              type="text"
              fullWidth
              value={selectedCaso ? selectedCaso.detalles : ''}
              onChange={(e) => setSelectedCaso({ ...selectedCaso, detalles: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Tipo de Solicitud"
              type="text"
              fullWidth
              value={selectedCaso ? selectedCaso.tipo : ''}
              onChange={(e) => setSelectedCaso({ ...selectedCaso, tipo: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Severidad</InputLabel>
              <Select
                label="Severidad"
                value={selectedCaso ? selectedCaso.severidad : ''}
                onChange={(e) => setSelectedCaso({ ...selectedCaso, severidad: e.target.value })}
              >
                <MenuItem value="HIGHEST">HIGHEST</MenuItem>
                <MenuItem value="HIGH">HIGH</MenuItem>
                <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                <MenuItem value="LOW">LOW</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Fecha de Creación"
              type="date"
              fullWidth
              value={selectedCaso ? selectedCaso.fecha : ''}
              onChange={(e) => setSelectedCaso({ ...selectedCaso, fecha: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Cliente"
              type="text"
              fullWidth
              value={selectedCaso ? selectedCaso.cliente : ''}
              onChange={(e) => setSelectedCaso({ ...selectedCaso, cliente: e.target.value })}
            />
            <TextField
              margin="dense"
              label="DNI"
              type="text"
              fullWidth
              value={selectedCaso ? selectedCaso.dni : ''}
              onChange={(e) => setSelectedCaso({ ...selectedCaso, dni: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancelar</Button>
            <Button onClick={handleSave} color="primary">{openEditDialog ? 'Guardar Cambios' : 'Añadir Caso'}</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Casos;