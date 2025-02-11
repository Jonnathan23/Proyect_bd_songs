import { Router } from "express";
import { body, param } from "express-validator";
import { awardExist, countryExist, genreExist, handleInputErrors, singerExist } from "./middleware";
import { CountriesController } from "./controllers/Countries.controller";
import { GenresController } from "./controllers/Genres.controller";
import { AwardsController } from "./controllers/Awards.controller";
import { SingersController } from "./controllers/Singers.controller";

const router = Router();


//* |------------| | Countries | |------------|

router.get('/countries', CountriesController.getCountries);

router.post('/countries',
    body('coun_name').notEmpty().withMessage('Country name is required'),
    handleInputErrors,
    CountriesController.createCountry
)

router.put('/countries/:country_id',
    param('country_id').isMongoId().withMessage('Country id is not valid'),
    body('coun_name').notEmpty().withMessage('Country name is required'),
    countryExist,
    handleInputErrors,
    CountriesController.updateCountryById
)

router.delete('/countries/:country_id',
    param('country_id').isMongoId().withMessage('Country id is not valid'),
    countryExist,
    handleInputErrors,
    CountriesController.deleteCountry
)

//* |------------| | Genres | |------------|
router.get('/genres', GenresController.getGenres);

router.post('/genres',
    body('gen_name').notEmpty().withMessage('Genre name is required'),
    handleInputErrors,
    GenresController.createGenre
)

router.put('/genres/:genre_id',
    param('genre_id').isMongoId().withMessage('Genre id is not valid'),
    body('gen_name').notEmpty().withMessage('Genre name is required'),
    genreExist,
    handleInputErrors,
    GenresController.updateGenreById
)


router.delete('/genres/:genre_id',
    param('genre_id').isMongoId().withMessage('Genre id is not valid'),
    genreExist,
    handleInputErrors,
    GenresController.deleteGenre
)

//* |------------| | Singers | |------------|

router.get('/singers', SingersController.getSingers)

router.post('/singers/:country_id/:genre_id',
    param('country_id').isMongoId().withMessage('Country id is not valid'),
    param('genre_id').isMongoId().withMessage('Genre id is not valid'),

    body('sin_name').notEmpty().withMessage('Singer name is required'),
    body('sin_date_birth').notEmpty().withMessage('Singer date of birth is required'),
    countryExist,
    genreExist,
    handleInputErrors,
    SingersController.createSinger
)

router.put('/singers/:singer_id',
    param('singer_id').isMongoId().withMessage('Singer id is not valid'),
    body('sin_name').notEmpty().withMessage('Singer name is required'),
    body('sing_date_birth').notEmpty().withMessage('Singer date of birth is required'),
    singerExist,
    handleInputErrors,
    SingersController.updateSinger
)

router.delete('/singers/:singer_id',
    param('singer_id').isMongoId().withMessage('Singer id is not valid'),
    singerExist,
    handleInputErrors,
    SingersController.deleteSinger
)

//* |------------| | Awards | |------------|

router.get('/awards', AwardsController.getAwards);

router.post('/awards',
    body('aw_name').notEmpty().withMessage('Award name is required'),
    awardExist,
    handleInputErrors,
    AwardsController.createAward
)

router.put('/awarsd/:award_id',
    param('award_id').isMongoId().withMessage('Award id is not valid'),
    body('aw_name').notEmpty().withMessage('Award name is required'),
    handleInputErrors,
    AwardsController.updateAward
)

router.delete('/awards/:award_id',
    param('award_id').isMongoId().withMessage('Award id is not valid'),
    handleInputErrors,
    AwardsController.deleteAward
)

//* |------------| | Songs | |------------|


export default router;