import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Sidebar from './Sidebar';

// Datos de ejemplo para los gráficos
const dataLine = [
  { name: 'Enero', entrantes: 400, resueltos: 240 },
  { name: 'Febrero', entrantes: 300, resueltos: 139 },
  { name: 'Marzo', entrantes: 200, resueltos: 980 },
  { name: 'Abril', entrantes: 278, resueltos: 390 },
  { name: 'Mayo', entrantes: 189, resueltos: 480 },
  { name: 'Junio', entrantes: 239, resueltos: 380 },
  { name: 'Julio', entrantes: 349, resueltos: 430 },
];

const dataPie = [
  { name: 'Muy Satisfecho', value: 400 },
  { name: 'Satisfecho', value: 300 },
  { name: 'Neutral', value: 300 },
  { name: 'Insatisfecho', value: 200 },
  { name: 'Muy Insatisfecho', value: 100 },
];

const dataBar = [
  { name: 'HIGHEST', value: 5 },
  { name: 'HIGH', value: 10 },
  { name: 'MEDIUM', value: 20 },
  { name: 'LOW', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5555'];

const Dashboard = () => {
  const systemStatus = 'ACTIVO'; // Puedes cambiar esto dinámicamente según el estado del sistema

  // Calcular KPIs
  const totalCasos = dataLine.reduce((acc, item) => acc + item.entrantes, 0);
  const casosResueltos = dataLine.reduce((acc, item) => acc + item.resueltos, 0);
  const casosAbiertos = totalCasos - casosResueltos;
  const tasaResolucion = ((casosResueltos / totalCasos) * 100).toFixed(2);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Dashboard de Gestión de Casos
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">Casos Entrantes vs Resueltos</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dataLine}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="entrantes" stroke="#8884d8" />
                    <Line type="monotone" dataKey="resueltos" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">Satisfacción del Cliente</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataPie}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box mt={2}>
                  {dataPie.map((entry, index) => (
                    <Paper key={index} sx={{ p: 1, mb: 1, backgroundColor: COLORS[index % COLORS.length], color: '#fff' }}>
                      <Typography variant="body1">
                        {entry.name}: {entry.value} ({((entry.value / dataPie.reduce((acc, item) => acc + item.value, 0)) * 100).toFixed(2)}%)
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">Distribución de Casos por Severidad</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataBar}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4" align="center">
                  SISTEMA PRINCIPAL:{' '}
                  <span style={{ color: systemStatus === 'ACTIVO' ? 'red' : 'yellow' }}>
                    {systemStatus === 'FUERA DE SERVICIO' ? 'ACTIVO' : 'FUERA DE SERVICIO'}
                  </span>
                </Typography>
                <Typography variant="h6" align="center" justifyContent="center">Próximo mantenimiento programado: 29/09/2024</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">Indicadores Clave de Rendimiento (KPIs)</Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, backgroundColor: '#4caf50', color: '#fff', textAlign: 'center' }}>
                      <Typography variant="h6">Total de Casos</Typography>
                      <Typography variant="h4">{totalCasos}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, backgroundColor: '#ff9800', color: '#fff', textAlign: 'center' }}>
                      <Typography variant="h6">Casos Abiertos</Typography>
                      <Typography variant="h4">{casosAbiertos}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, backgroundColor: '#2196f3', color: '#fff', textAlign: 'center' }}>
                      <Typography variant="h6">Casos Resueltos</Typography>
                      <Typography variant="h4">{casosResueltos}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, backgroundColor: '#9c27b0', color: '#fff', textAlign: 'center' }}>
                      <Typography variant="h6">Tasa de Resolución</Typography>
                      <Typography variant="h4">{tasaResolucion}%</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
