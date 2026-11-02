import { getFilterEpisodes, getListEpisodes } from "./controllers/podcast-controller";
import { Routes } from "./routes/routes";
import { HttpMethods } from "./utils/http-methods";
import * as http from "http";


export const app = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    //query string
    const [baseUrl, queryString] = req.url?.split("?") ?? ["", ""];
    console.log(baseUrl, queryString);

    // listar podcasts
    if (req.method === HttpMethods.GET && baseUrl === Routes.LIST){
        await getListEpisodes(req, res);
    }

    //filtrar podcast
    if (req.method === HttpMethods.GET && baseUrl === Routes.EPISODE){
        await getFilterEpisodes(req, res);
    }
}