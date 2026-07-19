import express from 'express';
import { getCountries, getRegions, getProvinces, getCitiesAndMunicipalities, getBarangays, getValidIds, getQuestionsAndAnswers } from '@/references/references.handlers.js';

const router = express.Router();

router.get('/countries', getCountries);
router.get('/regions', getRegions);
router.get('/provinces', getProvinces);
router.get('/cities-and-municipalities', getCitiesAndMunicipalities);
router.get('/barangays', getBarangays);
router.get('/valid-ids', getValidIds);
router.get('/questions', getQuestionsAndAnswers);

export default router;