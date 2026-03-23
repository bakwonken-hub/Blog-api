const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/swagger'); // Ajuste le chemin selon ta structure

// Import de tes routes
const articleRoutes = require('./src/routes/articleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes de ton API
app.use('/api', articleRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Route par défaut
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API Blog',
    documentation: 'http://localhost:3000/api-docs'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 Documentation Swagger : http://localhost:${PORT}/api-docs`);
});