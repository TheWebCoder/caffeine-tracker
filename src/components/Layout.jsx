import { useState } from "react";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";

export default function Layout(props) {
    const { children } = props;

    const [showModal, setShowModal] = useState(false);

    const { globalUser, logout } = useAuth();

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CaffeineTrackr</h1>
                <p>For Coffee Aficionados</p>
            </div>
            {globalUser ? (
                <button onClick={logout}>
                    <p>Logout</p>
                </button>
            ) : (
                <button
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <p>Sign up free</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>
            )}
        </header>
    );

    const footer = (
        <footer>
            <p>
                <span className="text-gradient">CaffeineTrackr</span> was made
                by{" "}
                <a href="#" target="_blank">
                    Bryan Gonzalez
                </a>
                <br />
                Check out the project on{" "}
                <a target="_blank" href="https://www.github.com/thewebcoder/">
                    GitHub
                </a>
                !
            </p>
        </footer>
    );

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            {header}
            <main>{children}</main>
            {footer}
        </>
    );
}
