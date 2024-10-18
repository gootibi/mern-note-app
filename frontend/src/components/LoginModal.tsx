import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/user.model";
import * as UserApi from "../network/user_api";
import { LoginCredentials } from "../network/user_api";
import styleUtils from "../styles/utils.module.css";
import TextInputField from "./form/TextInputField";

interface LoginModalProps {
    onDismiss: () => void;
    onLoginSuccess: (user: User) => void;
};

const LoginModal = ({ onDismiss, onLoginSuccess }: LoginModalProps) => {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await UserApi.login(credentials);
            onLoginSuccess(user);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>

            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField
                        name="username"
                        label="Username:"
                        type="text"
                        placeholder="Type your username..."
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />

                    <TextInputField
                        name="password"
                        label="Password:"
                        type="password"
                        placeholder="Type your password..."
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${styleUtils.width100} my-3`}
                    >
                        {isSubmitting ? "Loading..." : "Log In"}
                    </Button>

                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default LoginModal;