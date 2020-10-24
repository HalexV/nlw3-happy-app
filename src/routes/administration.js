const pages = require('../pages');

const router = require('express').Router();

router.get('/', pages.administration);
router.get('/create-orphanage', pages.createOrphanage);
router.get('/edit-orphanage', pages.editOrphanage);
router.get('/delete-orphanage', pages.deleteOrphanage);
router.get('/settings', pages.settings);
router.post('/settings', pages.settings);
router.post('/save-orphanage', pages.saveOrphanage);
router.post('/edit-orphanage', pages.editOrphanage);

module.exports = router;