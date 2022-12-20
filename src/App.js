import logo from "./logo.svg";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Authors from "./pages/Authors";
import GetAuthor from "./pages/GetAuthor";
import PostAuthor from "./pages/PostAuthor";
import PutAuthor from "./pages/PutAuthor";
import DeleteAuthor from "./pages/DeleteAuthor";

function App() {
    return (
        <BrowserRouter>
            {/* <MyNavbar /> */}
            <br />
            <Container>
                <h4>Authors</h4>
                <hr />
                <Routes>
                    <Route path="/" element={<Authors />} />
                    <Route path="/get-author" element={<GetAuthor />} />
                    <Route path="post-author" element={<PostAuthor />} />
                    <Route path="put-author" element={<PutAuthor />} />
                    <Route path="delete-author" element={<DeleteAuthor />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
