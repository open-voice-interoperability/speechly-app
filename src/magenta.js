const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const access_token = process.env.REACT_APP_MAGENTA_TOKEN || "";
const testing_secret = process.env.REACT_APP_TESTING_SECRET || "";

if (apiKey === undefined) {
    throw Error("Missing Magenta API key!");
}

class ApiClient {

    token: string;

    constructor(baseURL, apiKey, token = "") {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
        this.token = token;
    }

    _test_login() {
        return fetch(`https://${this.baseURL}/user/api/v1/login?testing=true&secret=${testing_secret}`, {
            method: "POST",
            headers: {
                "ApiKey": this.apiKey,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": crypto.randomUUID(),
            })
        }).then(response => response.json());
    }

    send_text(text) {
        if (this.token === "") {
            return this._test_login().then(response => {
                this.token = response.token;
                return this.send_text(text);
            });
        }
        return fetch(`https://${this.baseURL}/cvi/dm/api/v1/invoke/text/json?intent=true&skill=true&sessionId=null`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                "text": text,
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Response status ${response.status} was not ok`);
            }
            return response.json();
        });
    }
}

export default new ApiClient(baseUrl, apiKey, access_token);
