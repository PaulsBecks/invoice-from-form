import React, { useState } from "react";
import { Form, Button, Message, Input, Icon } from "semantic-ui-react";
import register from "../../services/backend/register";

export default function RegistrationForm({ setUser = () => {} }) {
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  return (
    <div>
      {error && <Message error>{error}</Message>}
      <Form>
        <Form.Field
          label="Email"
          placeholder="Email"
          control={Input}
          value={loginValues.email}
          onChange={(e, { value }) =>
            setLoginValues({ ...loginValues, email: value })
          }
        />
        <Form.Field
          label="Passwort"
          placeholder="Passwort"
          control={Input}
          type="password"
          value={loginValues.password}
          onChange={(e, { value }) =>
            setLoginValues({ ...loginValues, password: value })
          }
        />
        <Button
          type="submit"
          primary
          onClick={async () => {
            try {
              const user = await register(loginValues);
              await localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
            } catch (err) {
              setError(err.toString());
            }
          }}
        >
          Registrieren
          <Icon name="right chevron" />
        </Button>
      </Form>
    </div>
  );
}
