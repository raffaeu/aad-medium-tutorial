import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button, Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

/** Authentication */
import { AuthenticatedTemplate, UnauthenticatedTemplate, withMsal, WithMsalProps } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

class NavMenu extends React.PureComponent<WithMsalProps, { isOpen: boolean }> {

    logoff = () => {
        this.props.msalContext.instance.logoutRedirect();
    }

    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                {this.props.msalContext.inProgress !== InteractionStatus.None && (
                    <Progress color="secondary" animated value={100} />
                )}
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Authentication with Azure AD</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Secured Data</NavLink>
                                </NavItem>
                                <NavItem className="authenticated-user">
                                    <AuthenticatedTemplate>
                                        <span>Welcome {this.props.msalContext.accounts[0].name}</span>
                                        <Button size="sm" onClick={this.logoff}>Logout</Button>
                                    </AuthenticatedTemplate>
                                    <UnauthenticatedTemplate>
                                        <span>You are not authenticated</span>
                                    </UnauthenticatedTemplate>

                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default withMsal(NavMenu);