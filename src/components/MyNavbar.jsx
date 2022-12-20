import React from "react";
import { Navbar, Nav, NavDropdown, Badge, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function MyNavbar() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link>
                                <Badge>GET</Badge>
                                &nbsp; /authors
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/get-author">
                            <Nav.Link>
                                <Badge>GET</Badge>
                                &nbsp; /authors/:id
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/post-author">
                            <Nav.Link>
                                <Badge
                                    ref={(el) =>
                                        el &&
                                        el.style.setProperty(
                                            "background-color",
                                            "#cc7000",
                                            "important"
                                        )
                                    }
                                >
                                    POST
                                </Badge>
                                &nbsp; /authors
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/put-author">
                            <Nav.Link>
                                <Badge
                                    ref={(el) =>
                                        el &&
                                        el.style.setProperty(
                                            "background-color",
                                            "#cc7000",
                                            "important"
                                        )
                                    }
                                >
                                    PUT
                                </Badge>
                                &nbsp; /authors/:id
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/delete-author">
                            <Nav.Link>
                                <Badge
                                    ref={(el) =>
                                        el &&
                                        el.style.setProperty(
                                            "background-color",
                                            "red",
                                            "important"
                                        )
                                    }
                                >
                                    DELETE
                                </Badge>
                                &nbsp; /authors/:id
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
