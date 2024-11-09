import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Sidebar from './Sidebar';

const faqs = [
  {
    question: "¿Cómo puedo restablecer mi contraseña?",
    answer: "Para restablecer su contraseña, haga clic en 'Olvidé mi contraseña' en la página de inicio de sesión y siga las instrucciones."
  },
  {
    question: "¿Cómo contacto al soporte técnico?",
    answer: "Puede contactar al soporte técnico enviando un correo a soporte@empresa.com o llamando al 123-456-7890."
  },
  {
    question: "¿Dónde puedo ver el estado de mis tickets?",
    answer: "El estado de sus tickets puede ser visto en el panel de 'Gestión de Casos' en su cuenta."
  }
];

const procedures = [
  {
    title: "Proceso de Reporte de Incidencias",
    description: "Este procedimiento describe los pasos necesarios para reportar una incidencia en el sistema."
  },
  {
    title: "Guía de Uso del Sistema de Gestión de Casos",
    description: "Esta guía proporciona una visión general de cómo utilizar el sistema de gestión de casos, incluyendo cómo crear, editar y cerrar casos."
  }
];

const documentation = [
  {
    title: "Documentación del Sistema de Gestión de Casos",
    description: "La documentación completa del sistema de gestión de casos, incluyendo la arquitectura del sistema, flujos de trabajo y diagramas UML."
  },
  {
    title: "Manual de Usuario",
    description: "El manual de usuario proporciona instrucciones detalladas sobre cómo utilizar todas las funcionalidades del sistema."
  }
];

const BaseDeConocimiento = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Base de Conocimiento
        </Typography>

        <Typography variant="h5" gutterBottom>
          Preguntas Frecuentes (FAQs)
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Procedimientos
        </Typography>
        <Grid container spacing={2}>
          {procedures.map((procedure, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {procedure.title}
                  </Typography>
                  <Typography>{procedure.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Documentación
        </Typography>
        <Grid container spacing={2}>
          {documentation.map((doc, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {doc.title}
                  </Typography>
                  <Typography>{doc.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BaseDeConocimiento;
