import Countries from "../models/Countries.model"
import { Request, Response } from "express"

export class CountriesController {

    static getCountries = async (req: Request, res: Response) => {
        try {
            const countries = await Countries.find()
            res.status(200).send(countries)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static createCountry = async (req: Request, res: Response) => {
        try {
            const country = await Countries.create(req.body)
            res.status(200).send('Country created successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static updateCountryById = async (req: Request, res: Response) => {
        try {
            const country = req.country
            await country.updateOne(req.body)
            res.status(200).send('Country updated successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static deleteCountry = async (req: Request, res: Response) => {
        try {
            const country = req.country
            await country.deleteOne()
            res.status(200).send('Country deleted successfully')
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }
}