const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API pour gérer les articles d\'un blog',
      contact: {
        name: 'Ton Nom',
        email: 'ton.email@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      },
      {
        url: 'https://ton-api-deployee.com',
        description: 'Serveur de production'
      }
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          required: ['titre', 'contenu', 'auteur'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID unique de l\'article'
            },
            titre: {
              type: 'string',
              description: 'Titre de l\'article'
            },
            contenu: {
              type: 'string',
              description: 'Contenu de l\'article'
            },
            auteur: {
              type: 'string',
              description: 'Nom de l\'auteur'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Date de publication'
            },
            categorie: {
              type: 'string',
              description: 'Catégorie de l\'article'
            },
            tags: {
              type: 'string',
              description: 'Tags associés'
            }
          }
        },
        ArticleInput: {
          type: 'object',
          required: ['titre', 'contenu', 'auteur'],
          properties: {
            titre: {
              type: 'string',
              description: 'Titre de l\'article'
            },
            contenu: {
              type: 'string',
              description: 'Contenu de l\'article'
            },
            auteur: {
              type: 'string',
              description: 'Nom de l\'auteur'
            },
            categorie: {
              type: 'string',
              description: 'Catégorie de l\'article'
            },
            tags: {
              type: 'string',
              description: 'Tags associés'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Chemin vers tes fichiers de routes
};

const specs = swaggerJsdoc(options);
module.exports = specs;