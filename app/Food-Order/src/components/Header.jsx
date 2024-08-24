import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
export default function Header(props) {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="" />
                <h1>REACTFOOD</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({props.count})</Button>
            </nav>
        </header>
    );
}
