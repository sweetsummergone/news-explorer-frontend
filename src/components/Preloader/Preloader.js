export default function Preloader({ size }) {
    if (!size) {
        return <i className="preloader" />
    } return <i className={`preloader preloader__${size}`} />
}