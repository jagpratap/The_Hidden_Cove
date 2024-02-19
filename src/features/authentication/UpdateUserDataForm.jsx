import { useState } from "react";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { full_name },
    },
  } = useUser();
  const { isUpdatingUser, handleUpdateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(full_name);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;

    console.log(fullName, avatar);

    // handleUpdateUser(
    //   { full_name: fullName, avatar },
    //   {
    //     onSuccess: () => {
    //       setAvatar(null);
    //       e.target.reset();
    //     },
    //   }
    // );
  }

  function handleCancel() {
    setFullName(full_name);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* Email */}
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      {/* Full name */}
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdatingUser}
        />
      </FormRow>

      {/* Image */}
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdatingUser}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdatingUser}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
