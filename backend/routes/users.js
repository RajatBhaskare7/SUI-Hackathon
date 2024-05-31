const Users = require('../controllers/users');
const express = require('express');
const upload = require('../middleware/upload.js');
const router = express.Router();

router.get('/getuser', Users.getUsers);
router.post('/adduser', Users.addUser); 
router.post('/updateuser/:id',upload.fields([
    { name: 'aadharcardfront', maxCount: 1 },
    { name: 'pancard', maxCount: 1 },
    { name: 'aadharcardback', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
]),Users.editUser);
router.delete('/deleteuser/:id',Users.deleteUser);
 

module.exports = router;
