export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Developed by Pasha Zobov</p>
            <p className="footer__text">{new Date().getFullYear()}</p>
        </footer>
    );
}