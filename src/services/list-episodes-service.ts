import { podcastTransferModel } from "../models/podcast-transfer-model";
import {repoPodcast} from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceListEpisodes = async () => {
    //define o contrato
     let responseFomart:podcastTransferModel = {
            statusCode: 0,
            body: []
        } 
    //busca os dados
    const data = await repoPodcast();
    //verifica o tipo de resposta
    responseFomart = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
        body: data
    }

    return responseFomart;
    }

