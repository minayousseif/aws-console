# aws-console
A simple CLI tool to open the AWS management console from the command line without the need for an AWS console username and password. It creates a temporary session and sign-in token to access the AWS console. Signing in to the console with the generated URL creates a session that is valid for 12 hours.

[![NPM](https://nodei.co/npm/aws-console.png)](https://nodei.co/npm/aws-console/)

### Prerequisites:
- Install Node.js on your system if it is not already installed.
- The AWS credentials is configured on your system. [see this guide for more help.](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration)
- Your IAM user or role has `Administrator Permissions` or can perform [GetFederationToken](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetFederationToken.html) API operations.


### Installation:
```bash
$ npm install aws-console -g
```
or 
```bash
$ yarn global add aws-console
```

### Usage:
Starting a new AWS console session in the default browser is as easy as:

```bash
$ aws-console
```

### Compatibility:
- Tested on Linux and should work on MacOS. 
- No Windows support at the moment. 
- All Node.js versions are supported starting Node.js 8.X.
- If something doesn’t work, please [file an issue](https://github.com/minayousseif/aws-console/issues).

### Next Steps:
- Enable MFA

### License: MIT

### Contributing
Unfortunately, I am not accepting any contributions or PRs (Pull Requests) at the moment. The package still WIP, And until I open the project for contribution, add a code of conduct, I'd recommenced requesting new features via the [issues section](https://github.com/minayousseif/aws-console/issues).

