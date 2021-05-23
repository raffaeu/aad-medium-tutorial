import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'

/** authentication */
import { MSAL_CONFIG } from './azure/aad-config';
import { MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";

const pca = new PublicClientApplication(MSAL_CONFIG);


export default () => (
    <MsalProvider instance={pca}>
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
            </Layout>
        </MsalAuthenticationTemplate>
    </MsalProvider>
);
