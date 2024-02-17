import { useState } from "react";

import { useLogin } from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin@example");

  const { isLoggingIn, handleLogin } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    handleLogin(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          disabled={isLoggingIn}
        />
      </FormRow>

      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={isLoggingIn}
        />
      </FormRow>

      <FormRow orientation="vertical">
        <Button size="large" disabled={isLoggingIn}>
          {!isLoggingIn ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
