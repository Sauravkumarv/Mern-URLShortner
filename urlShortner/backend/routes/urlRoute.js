const express=require('express');
const router=express.Router();
const {handelGenerateNewShortUrl,getUrl, getbyId, analytics}=require('../controller/url')


router.post('/shorten',handelGenerateNewShortUrl)
router.get('/urls',getUrl)
router.get('/:shortId',getbyId)
router.get('/analytics/:shortId',analytics)

module.exports=router;