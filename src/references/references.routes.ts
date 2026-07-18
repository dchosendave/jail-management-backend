import express from 'express';
import { getCountries, getRegions, getProvinces, getCitiesAndMunicipalities, getBarangays, getValidIds } from './references.js';

const router = express.Router();

router.get('/countries', getCountries);
router.get('/regions', getRegions);
router.get('/provinces', getProvinces);
router.get('/cities-and-municipalities', getCitiesAndMunicipalities);
router.get('/barangays', getBarangays);
router.get('/valid-ids', getValidIds);

export default router;