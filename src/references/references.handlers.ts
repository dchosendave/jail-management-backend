import { type Request, type Response } from 'express';

export async function getCountries(req: Request, res: Response){
    return res.status(200).send({
        countries: [
            {
                code: 'PH',
                name: 'Philippines'
            }
        ]
    });
}

export async function getRegions(req: Request, res: Response) {
    return res.status(200).send({
        regions: [
            {
                number: 1,
                name: "Region I"
            }
        ]
    })

}

export async function getProvinces(req: Request, res: Response) {

}

export async function getCitiesAndMunicipalities(req: Request, res: Response) {

}

export async function getBarangays(req: Request, res: Response) {

}

export async function getValidIds(req: Request, res: Response) {
    
}

export async function getQuestionsAndAnswers(req: Request, res: Response) {
    
}