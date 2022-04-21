const base_url = "genie.stanford.edu";
const access_token = process.env.REACT_APP_ACCESS_TOKEN;

if (access_token === undefined) {
    throw Error("Missing Genie access token!");
}

class ApiClient {

    constructor(baseURL, token) {
        this.baseURL = baseURL;
        this.token = token;
    }

    ws_connect() {
        const ws = new WebSocket(`wss://${this.baseURL}/me/api/conversation?access_token=${this.token}`);
        ws.onmessage = (evt: MessageEvent) => {
            const data = JSON.parse(evt.data);
            console.log(data);
        };
        return new Promise((resolve, reject) => {
            ws.onopen = () => {
                resolve(ws);
            };
            ws.onerror = (evt: Event) => {
                reject(evt);
            };
        });
    }

    send_text(text) {
        return fetch(`https://${this.baseURL}/me/api/converse`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "command": {
                    "type": "command",
                    "text": text,
                },
            })
        }).then(response => response.json());
    }
}

export default new ApiClient(base_url, access_token);
