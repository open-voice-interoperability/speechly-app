# Speechly App

This is a React component that demonstrates [Speechly](https://www.npmjs.com/package/@speechly/react-client) 
interoperability with [Genie](https://wiki.almond.stanford.edu/api-references/web-almond) and Magenta smart assistants.

_Note that you will need to have [Node.js](https://nodejs.org) (tested on v16.14.2) installed._

## Get started

```bash
git clone https://github.com/open-voice-network/speechly-app.git
cd speechly-app
npm install
```

> **Note**: for simplicity, we skip authentication part and assume you have a valid access token. 

Add `App ID` and auth token to `./.env`:

```env
REACT_APP_ACCESS_TOKEN="your-access-token"
REACT_APP_APP_ID="your-app-id"
```

Start the development server

```bash
npm start
```

Navigate to [localhost:3000](http://localhost:3000) and you should see your app running. 
Open the Developer Console to see speech segments and raw responses from Genie.

