import { useState } from "react";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";

export default function Layout(props) {
    const { children } = props;
    const [showModal, setShowModal] = useState(false);
    const { globalUser, logout } = useAuth();

    const header = (
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 animate-in">
            <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
                    CaffeineTrackr
                </h1>
                <p className="text-stone-400 text-sm mt-1 font-medium">
                    For Coffee Aficionados
                </p>
            </div>
            {globalUser ? (
                <button
                    type="button"
                    onClick={logout}
                    className="btn-ghost"
                >
                    <span>Logout</span>
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="btn-primary"
                >
                    <span>Sign up free</span>
                    <i className="fa-solid fa-mug-hot text-lg" aria-hidden />
                </button>
            )}
        </header>
    );

    const footer = (
        <footer className="pt-8 pb-4 mt-auto border-t border-white/10 text-sm text-stone-500">
            <p>
                <span className="text-gradient font-semibold">CaffeineTrackr</span>{" "}
                was made by{" "}
                <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                    Bryan Gonzalez
                </a>
                .<br />
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.github.com/thewebcoder/"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                    View on GitHub
                </a>
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
            <main className="flex flex-col gap-10 flex-1">{children}</main>
            {footer}
        </>
    );
}
