import axios from "axios";

const API_BASE_URL = "https://api.shrtco.de/v2/shorten?url=";

class InputShortenerService{
    getShortenUrl(userInput) {
        return axios.get(API_BASE_URL + userInput);
    }
}
export default new InputShortenerService()