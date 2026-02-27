import ReactDom from "react-dom";

export default function Modal(props) {
    const { children, handleCloseModal } = props;

    return ReactDom.createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in opacity-0">
            <button
                type="button"
                onClick={handleCloseModal}
                className="absolute inset-0 bg-stone-950/80 backdrop-blur-md z-[99] border-0 cursor-default"
                aria-label="Close modal"
            />
            <div className="relative z-[101] w-full max-w-md glass-card p-6 sm:p-8 flex flex-col gap-6 min-h-[340px] animate-in opacity-0 animate-in-delay-1">
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    );
}
