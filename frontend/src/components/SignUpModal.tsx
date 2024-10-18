import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/user.model";
import * as UserApi from "../network/user_api";
import { SignUpCredentials } from "../network/user_api";
import styleUtils from "../styles/utils.module.css";
import TextInputField from "./form/TextInputField";

interface SignUpModelProps {
    onDismiss: () => void;
    onSignUpSuccessful: (user: User) => void;
};

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModelProps) => {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        },
    } = useForm<SignUpCredentials>();

    async function onSumbit(credentials: SignUpCredentials) {
        try {
            const newUser = await UserApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSumbit)}>

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
                        name="email"
                        label="Email:"
                        type="email"
                        placeholder="Type your email..."
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
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
                        {isSubmitting ? "Loading..." : "Sign Up"}
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default SignUpModal;