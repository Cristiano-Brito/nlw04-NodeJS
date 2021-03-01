import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    //http://localhost:3333/answers/1?u=44035c33-b5e3-4794-9216-5a554928968f
    /**
     * 
     * Route Params => Parametros que compõe a rota, obrigatório
     * routes.get("/answers/:value")
     * 
     * Query Params => Busca, Paginação, não obrigatórios
     * ?
     * chave=valor
     */
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser) {
            throw new AppError("Survey User does not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);

    }
}

export { AnswerController };