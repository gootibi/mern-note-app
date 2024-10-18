import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void;
    onLoginClicked: () => void;
};

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked: onSLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
            <Button onClick={onSLoginClicked}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;