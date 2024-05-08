# API Flow:


Since Snyk Apps follow the OAuth2 standard it is very important to understand the complete API flow. Please note this document is for reference purposes. Please follow our [Snyk App Docs](https://docs.snyk.io/snyk-api/snyk-apps), [Snyk API Docs](https://apidocs.snyk.io/?version=2023-11-03#post-/orgs/-org_id-/apps/creations) for the latest updates and details. 

To start developing a Snyk App, the first thing you will need to do is to create a Snyk App.

## Create A Snyk App:


You can create a Snyk App using our API [Create Snyk App](https://apidocs.snyk.io/?version=2023-11-03#post-/orgs/-org_id-/apps/creations) or use the `create-app` script in the demo app to do so. Please follow the Readme to use the provided script.


## Setup Authorization of Users:


Once you have the required information for your Snyk App (returned in the previous step). You will use that information to set up the authorization of users with their Snyk accounts. For example, in our demo app this is done by redirecting your app user to the following URL(web URL):

`https://app.snyk.io/oauth2/authorize?code_challenge=88cd9661-58dd-4b3a-8720-19e75a98039a&code_challenge_method=S256&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=apps%3Abeta&state=t4OJEdKP3CVTMOaMbC6kRr1o&client_id=your_client_id`

In our demo app, all this is done automatically under the hood by the OAuth2 library used [passportjs OAuth2](http://www.passportjs.org/packages/passport-oauth2/). 

The `scopes` and the `redirect_uri` should be in the list with which the App was created. The `state` value is used to carry any App-specific state from this `/authorize` call to the callback on the `redirect_uri` (such as a user’s id). It must be verified in your callback to prevent CSRF attacks. 

OAuth 2.0 public clients utilizing the Authorization Code Grant are susceptible to the authorization code interception attack. Threats are mitigated through the use of [Proof Key for Code Exchange](https://datatracker.ietf.org/doc/html/rfc7636) (PKCE, pronounced "pixy"). For greater security, Snyk Apps requires PKCE for confidential clients as well.

After the connection is complete, the user is redirected to the provided redirect URI with query string parameters `code` and `state` added on. The state value is used for verification and as mentioned earlier to prevent CSRF attacks. The code value is used in the next step.

## Exchange Authorization Code:


Once you receive the `code` you will need to exchange it for `access` and `refresh` tokens. Please read our [API Docs](https://docs.snyk.io/snyk-api/snyk-apps/set-up-a-snyk-app-using-the-oauth2-api/set-up-to-authorize-users) for more details.


## Refresh Access Token:


From time to time in your Snyk App, you will need to refresh the user `access_token`. Details of the API call can be found in our [API Docs](https://docs.snyk.io/snyk-api/snyk-apps/set-up-a-snyk-app-using-the-oauth2-api/set-up-the-refresh-token-exchange)
