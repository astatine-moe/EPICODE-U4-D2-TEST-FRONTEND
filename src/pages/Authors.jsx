import React from "react";
import { useEffect, useState } from "react";
import { doFetch, baseUri } from "../api";
import { Spinner, Button, Modal, Form, Alert } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill, BsX } from "react-icons/bs";

export default function Authors() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [authors, setAuthors] = useState([]);

    const [isDeleting, setIsDeleting] = useState("");

    const [editShow, setEditShow] = useState(false);
    const [createShow, setCreateShow] = useState(false);

    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);
    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => setCreateShow(true);

    const [newAuthor, setNewAuthor] = useState({});
    const [editAuthor, setEditAuthor] = useState({});

    let t;
    const showError = (error) => {
        clearTimeout(t);
        setError(error);
        setTimeout(function () {
            setError("");
        }, 10000);
    };

    const onChangeHandler = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setNewAuthor({
            ...newAuthor,
            [id]: value,
        });
    };
    const onChangeHandler2 = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setEditAuthor({
            ...editAuthor,
            [id]: value,
        });
    };

    const handleCreateAuthor = async () => {
        const { data, status } = await doFetch(
            `${baseUri}/authors`,
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(newAuthor),
            },
            true
        );

        setCreateShow(false);
        if (status === "ok") {
            setAuthors([...authors, data.author]);
        } else {
            showError(data.error);
        }
    };

    const handleEditAuthor = async () => {
        const { data, status } = await doFetch(
            `${baseUri}/authors/${editAuthor.id}`,
            {
                headers: { "Content-Type": "application/json" },
                method: "PUT",
                body: JSON.stringify(editAuthor),
            },
            true
        );

        setEditShow(false);
        if (status === "ok") {
            setAuthors([
                ...authors.filter((a) => a.id !== editAuthor.id),
                data.author,
            ]);
        } else {
            showError(data.error);
        }
    };

    useEffect(() => {
        const fetchAuthors = async () => {
            setIsLoading(true);
            const { data, status } = await doFetch(
                `${baseUri}/authors`,
                {},
                true
            );
            setIsLoading(false);
            if (status === "ok") {
                setAuthors(data);
            } else {
                showError(data.error);
            }
        };

        fetchAuthors();
    }, []);

    const deleteAuthor = async (id) => {
        setIsDeleting(id);
        const { data, status } = await doFetch(`${baseUri}/authors/${id}`, {
            method: "DELETE",
        });
        setIsDeleting("");

        if (status === "ok") {
            //remove from array
            setAuthors(authors.filter((author) => author.id !== id));
        } else {
            showError(data.error);
        }
    };

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}

            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date of Birth</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <th colSpan={4} className="text-center">
                                <Spinner />
                            </th>
                        </tr>
                    )}

                    {!isLoading && authors.length === 0 && (
                        <tr>
                            <th colSpan={4} className="text-center">
                                No authors found
                            </th>
                        </tr>
                    )}

                    {!isLoading &&
                        authors.map((author) => (
                            <tr>
                                <th>
                                    <img
                                        src={author.avatar}
                                        className="avatar"
                                    />
                                    {author.name} {author.surname}
                                </th>
                                <th>{author.email}</th>
                                <th>{author.dob}</th>
                                <th>
                                    <Button
                                        variant="warning"
                                        onClick={(e) => {
                                            setEditAuthor(author);
                                            handleEditShow();
                                        }}
                                    >
                                        {<BsFillPencilFill />}
                                    </Button>
                                    <Button variant="danger">
                                        {
                                            <BsFillTrashFill
                                                onClick={(e) => {
                                                    deleteAuthor(author.id);
                                                }}
                                            />
                                        }
                                    </Button>
                                </th>
                            </tr>
                        ))}

                    {!isLoading && (
                        <tr>
                            <th colSpan={4} className="text-center">
                                <Button
                                    variant="success"
                                    onClick={setCreateShow}
                                >
                                    Add author
                                </Button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal show={editShow} onHide={handleEditClose} size="lg">
                <Modal.Header>
                    <div>
                        Edit{" "}
                        <b>
                            {editAuthor?.name} {editAuthor?.surname}
                        </b>
                    </div>
                    <BsX
                        onClick={handleEditClose}
                        className="modal-close"
                        size={30}
                    />
                </Modal.Header>

                <Modal.Body>
                    <Form className="mt-1">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name*</Form.Label>
                            <Form.Control
                                type="text"
                                value={editAuthor.name}
                                onChange={onChangeHandler2}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Surname*</Form.Label>
                            <Form.Control
                                type="text"
                                value={editAuthor.surname}
                                onChange={onChangeHandler2}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control
                                type="email"
                                value={editAuthor.email}
                                onChange={onChangeHandler2}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dob">
                            <Form.Label>DOB*</Form.Label>
                            <Form.Control
                                type="date"
                                value={editAuthor.dob}
                                onChange={onChangeHandler2}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="warning"
                        className="float-right pilled"
                        onClick={handleEditAuthor}
                        disabled={
                            editAuthor.name &&
                            editAuthor.surname &&
                            editAuthor.email &&
                            editAuthor.dob
                                ? null
                                : true
                        }
                    >
                        Edit
                    </Button>
                    <Button onClick={handleEditClose} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={createShow} onHide={handleCreateClose} size="lg">
                <Modal.Header>
                    Add Author
                    <BsX
                        onClick={handleCreateClose}
                        className="modal-close"
                        size={30}
                    />
                </Modal.Header>

                <Modal.Body>
                    <Form className="mt-1">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name*</Form.Label>
                            <Form.Control
                                type="text"
                                value={newAuthor.name}
                                onChange={onChangeHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Surname*</Form.Label>
                            <Form.Control
                                type="text"
                                value={newAuthor.surname}
                                onChange={onChangeHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control
                                type="email"
                                value={newAuthor.email}
                                onChange={onChangeHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dob">
                            <Form.Label>DOB*</Form.Label>
                            <Form.Control
                                type="date"
                                value={newAuthor.dob}
                                onChange={onChangeHandler}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        className="float-right pilled"
                        onClick={handleCreateAuthor}
                        disabled={
                            newAuthor.name &&
                            newAuthor.surname &&
                            newAuthor.email &&
                            newAuthor.dob
                                ? null
                                : true
                        }
                    >
                        Add
                    </Button>
                    <Button onClick={handleCreateClose} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
