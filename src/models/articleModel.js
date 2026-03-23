const db = require('../config/database');

// Créer un article
const createArticle = (article, callback) => {
  const { titre, contenu, auteur, date, categorie, tags } = article;
  const query = `
    INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(query, [titre, contenu, auteur, date, categorie, tags], function(err) {
    callback(err, { id: this.lastID });
  });
};

// Récupérer tous les articles (avec filtres optionnels)
const getArticles = (filters, callback) => {
  let query = 'SELECT * FROM articles WHERE 1=1';
  const params = [];
  
  if (filters.categorie) {
    query += ' AND categorie = ?';
    params.push(filters.categorie);
  }
  if (filters.auteur) {
    query += ' AND auteur = ?';
    params.push(filters.auteur);
  }
  if (filters.date) {
    query += ' AND date = ?';
    params.push(filters.date);
  }
  
  db.all(query, params, callback);
};

// Récupérer un article par ID
const getArticleById = (id, callback) => {
  db.get('SELECT * FROM articles WHERE id = ?', [id], callback);
};

// Mettre à jour un article
const updateArticle = (id, article, callback) => {
  const { titre, contenu, categorie, tags } = article;
  const query = `
    UPDATE articles 
    SET titre = ?, contenu = ?, categorie = ?, tags = ?
    WHERE id = ?
  `;
  db.run(query, [titre, contenu, categorie, tags, id], callback);
};

// Supprimer un article
const deleteArticle = (id, callback) => {
  db.run('DELETE FROM articles WHERE id = ?', [id], callback);
};

// Rechercher des articles
const searchArticles = (queryText, callback) => {
  const query = `
    SELECT * FROM articles 
    WHERE titre LIKE ? OR contenu LIKE ?
  `;
  const searchTerm = `%${queryText}%`;
  db.all(query, [searchTerm, searchTerm], callback);
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
};