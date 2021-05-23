import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

/** Authentication */
import { AuthenticatedTemplate, UnauthenticatedTemplate, withMsal, WithMsalProps } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { AuthProvider, AuthProviderCallback, Client } from '@microsoft/microsoft-graph-client';

class Home extends React.PureComponent<WithMsalProps, { profile: string}> {

  authProvider: AuthProvider = async (callback: AuthProviderCallback) => {
    // retrieve token
    var token = await this.props.msalContext
      .instance.acquireTokenSilent({
        scopes: ['User.Read.All'],
        account: this.props.msalContext.accounts[0]
      })
      .then((response) => {
        callback('', response.accessToken);
      })
      .catch((error) => {
        callback(error, '');
      });
  };

  retrieveProfile = async () => {
    const client = Client.init({ authProvider: this.authProvider});
    var profile = await client.api('/me').get();
    this.setState({
      profile: JSON.stringify(profile, null, 4)
    })
  }

  public state = {
    profile: ''
  };

  public render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>Use the button below to retrieve your user profile via Graph APIs</p>
        <Button color="primary" onClick={this.retrieveProfile}>Retrieve Profile</Button>
        <pre className="profile">{this.state.profile}</pre>
      </div>

    );
  }
}

export default connect()(withMsal(Home));
