const articleModel = require('../models/articleModel');

// Créer un article
exports.createArticle = (req, res) => {
  const { titre, contenu, auteur, date, categorie, tags } = req.body;
  
  // Validation
  if (!titre || !contenu || !auteur) {
    return res.status(400).json({ error: 'Titre, contenu et auteur sont obligatoires' });
  }
  
  const article = {
    titre,
    contenu,
    auteur,
    date: date || new Date().toISOString().split('T')[0],
    categorie: categorie || 'Général',
    tags: tags || ''
  };
  
  articleModel.createArticle(article, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.id, message: 'Article créé avec succès' });
  });
};

// Récupérer tous les articles
exports.getArticles = (req, res) => {
  const filters = {
    categorie: req.query.categorie,
    auteur: req.query.auteur,
    date: req.query.date
  };
  
  articleModel.getArticles(filters, (err, articles) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(articles);
  });
};

// Récupérer un article par ID
exports.getArticleById = (req, res) => {
  const { id } = req.params;
  
  articleModel.getArticleById(id, (err, article) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!article) return res.status(404).json({ error: 'Article non trouvé' });
    res.status(200).json(article);
  });
};

// Mettre à jour un article
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const { titre, contenu, categorie, tags } = req.body;
  
  articleModel.updateArticle(id, { titre, contenu, categorie, tags }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Article mis à jour avec succès' });
  });
};

// Supprimer un article
exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  
  articleModel.deleteArticle(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Article supprimé avec succès' });
  });
};

// Rechercher des articles
exports.searchArticles = (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Paramètre de recherche requis' });
  }
  
  articleModel.searchArticles(query, (err, articles) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(articles);
  });
};