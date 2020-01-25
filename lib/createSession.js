/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const AWS = require('aws-sdk');
const axios = require('axios');
const open = require('open');

const SIGNIN_URL = 'https://signin.aws.amazon.com/federation';
const CONSOLE_URL = 'https://console.aws.amazon.com/';
const TTL_SECONDS = 43200;

// https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-custom-url.html
// https://aws.amazon.com/code/aws-management-console-federation-proxy-sample-use-case/

const createSession = (profile) => {
  /*
    The following AWS STS API call creates a temporary session that returns
    a temporary security credentials and a session token.
    The policy grants permissions to the AWS management console.
  */

  if (profile && Object.keys(profile).length) {
    AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile });
  }

  const sts = new AWS.STS();

  const federationTokenParams = {
    Name: 'TempUserSession',
    DurationSeconds: TTL_SECONDS,
    Policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: '*',
          Resource: '*'
        }
      ]
    })
  };

  sts.getFederationToken(federationTokenParams, (err, data) => {
    const defaultErrorMsg = 'Oops, something went wrong. It seems like the call to the federation endpoint did fail';
    if (err) {
      // an error occurred
      console.error(err);
    } else {
      /**
        On successful response from the aws sdk, we call the federation endpoint,
        passing the parameters created earlier and the session information as a JSON block.
        The request returns a sign-in token that's valid for 15 minutes. Signing in to
        the console with the token creates a session that is valid for 12 hours.
      */
      const requestParams = {
        Action: 'getSigninToken',
        DurationSeconds: TTL_SECONDS,
        SessionType: 'json',
        Session: {
          sessionId: data.Credentials.AccessKeyId,
          sessionKey: data.Credentials.SecretAccessKey,
          sessionToken: data.Credentials.SessionToken
        }
      };

      axios.get(SIGNIN_URL, { params: requestParams }).then((resp) => {
        // handle success
        if (resp && resp.status === 200 && resp.data) {
          if (resp.data.SigninToken) {
            /*
              Once we have a sign-in token returned by the federation endpoint,
              We then create the URL to open in the browser, which includes the
              sign-in token and the URL of the console to open, The "issuer" parameter is optional but
              we are not using it since there is no custom identity broker, and we just using our cmd line
            */
            const loginUrl = new URL(SIGNIN_URL);
            loginUrl.searchParams.append('Action', 'login');
            loginUrl.searchParams.append('Destination', CONSOLE_URL);
            loginUrl.searchParams.append('SigninToken', resp.data.SigninToken);
            open(loginUrl.href);
          } else {
            console.error(`${defaultErrorMsg}. No 'SigninToken' value is returned, please try again.`);
          }
        } else {
          console.error(`${defaultErrorMsg}, please try again.`);
        }
      }).catch((err) => {
        // an error occurred
        console.error(`${defaultErrorMsg}, Error: ${err}`);
      });
    }
  });
};

module.exports = createSession;
