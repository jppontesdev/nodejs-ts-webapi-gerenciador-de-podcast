import {Podcast} from "./podcast-model";

export interface podcastTransferModel {
    statusCode: number;
    body:Podcast[];
}