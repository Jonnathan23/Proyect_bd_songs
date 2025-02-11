import { Router } from "express";
import { body, param } from "express-validator";
import { awardExist, countryExist, genreExist, handleInputErrors, monthly_salesExist, playbackExist, singerExist, song_genreExist, songExist } from "./middleware";
import { CountriesController } from "./controllers/Countries.controller";
import { GenresController } from "./controllers/Genres.controller";
import { AwardsController } from "./controllers/Awards.controller";
import { SingersController } from "./controllers/Singers.controller";
import { Songs_genresController } from "./controllers/Songs_genres.controller";
import { SongsController } from "./controllers/Songs.controller";
import { PlaybacksController } from "./controllers/Playbacks.controller";
import { Monthly_salesController } from "./controllers/Monthly_sales.controller";

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

//* |------------| | Songs_genres | |------------|

router.get('/song_genres', Songs_genresController.getSongs_genres);

router.post('/song_genres',
    body('son_gen_name').notEmpty().withMessage('Song genre name is required'),
    handleInputErrors,
    Songs_genresController.creteSong_genre
)

router.put('/song_genres/:song_genre_id',
    param('song_genre_id').isMongoId().withMessage('Song genre id is not valid'),
    body('son_gen_name').notEmpty().withMessage('Song genre name is required'),
    song_genreExist,
    handleInputErrors,
    Songs_genresController.updateSong_genreById
)

router.delete('/song_genres/:song_genre_id',
    param('song_genre_id').isMongoId().withMessage('Song genre id is not valid'),
    song_genreExist,
    handleInputErrors,
    Songs_genresController.deleteSong_genre
)

//* |------------| | Songs | |------------|
router.get('/songs', SongsController.getSongs);

router.get('/songs/:song_id',
    param('song_id').isMongoId().withMessage('Song id is not valid'),
    songExist,
    handleInputErrors,
    SongsController.getSongById
)

//! Canciones por genero
router.get('/songs/genre/:song_genre_id',
    param('song_genre_id').isMongoId().withMessage('Song genre id is not valid'),
    song_genreExist,
    handleInputErrors,
    SongsController.getSongsByGenre
)

//! Canciones por fecha
router.get('/songs/release-date/:startDate/:endDate',
    param("startDate")
        .notEmpty().withMessage("Start date is required")
        .isISO8601().withMessage("Start date is not valid"),
    param("endDate")
        .notEmpty().withMessage("End date is required")
        .isISO8601().withMessage("End date is not valid"),
    handleInputErrors,
    SongsController.getSongReleaseDate
)

//! Canciones por cantante
router.get('/songs/singer/:singer_id',
    param('singer_id').isMongoId().withMessage('Singer id is not valid'),
    singerExist,
    handleInputErrors,
    SongsController.getSongsBySinger
)

router.post('/songs/:singer_id/:song_genre_id',
    param('singer_id').isMongoId().withMessage('Singer id is not valid'),
    param('song_genre_id').isMongoId().withMessage('Song genre id is not valid'),

    body('son_name').notEmpty().withMessage('Song name is required'),
    body('son_release_date')
        .notEmpty().withMessage('Release date is required')
        .isISO8601().withMessage("End date is not valid"),
    singerExist,
    song_genreExist,
    handleInputErrors,
    SongsController.createSong
)

router.delete('/songs/:song_id',
    param('song_id').isMongoId().withMessage('Song id is not valid'),
    songExist,
    handleInputErrors,
    SongsController.deleteSong
)

//* |------------| | Playbacks | |------------|

router.get('/playbacks', PlaybacksController.getPlaybacks);

router.delete('/playbacks:/:playback_id',
    param('playback_id').isMongoId().withMessage('Playback id is not valid'),
    playbackExist,
    handleInputErrors,
    PlaybacksController.deletePlayback
)

//* |------------| | Monthly_sales | |------------|

router.get('/monthly_sales', Monthly_salesController.getMonthly_sales);

router.get('/monthly_sales/:monthly_sales_id',
    param('monthly_sales_id').isMongoId().withMessage('Monthly sales id is not valid'),
    monthly_salesExist,
    handleInputErrors,
    Monthly_salesController.getMonthly_salesById
)


router.post('/monthly_sales',
    body('mont_date')
        .notEmpty().withMessage('Monthly sales date is required')
        .isISO8601().withMessage('Monthly sales date is not valid'),
    songExist,
    handleInputErrors,
    Monthly_salesController.createMonthly_sales
)

export default router;