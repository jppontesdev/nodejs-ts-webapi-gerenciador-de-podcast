import {repoPodcast} from "../repositories/podcasts-repository";
import { podcastTransferModel } from "../models/podcast-transfer-model";
import { StatusCode } from "../utils/status-code";

export const serviceFilterEpisodes = async (podcastName: string | undefined): Promise<podcastTransferModel> => {
    //defini a interface de retorno 
    let responseFomart:podcastTransferModel = {
        statusCode: 0,
        body: []
    } 
    //buscando os dados
    const queryString = podcastName?.split("?p=")[1] || ""
    const data = await repoPodcast(queryString);

    //verifico se tem conteudo
    responseFomart = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
        body: data
    }

    return responseFomart;
}