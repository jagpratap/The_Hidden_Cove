import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const { isLoadingSettings, settings } = useSettings();
  const { isUpdatingSettings, handleUpdateSetting } = useUpdateSetting();

  const {
    min_booking_length,
    max_booking_length,
    max_guests_per_booking,
    breakfast_price,
  } = settings || {};

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value || Number(value) === Number(settings[field])) return;

    handleUpdateSetting({ [field]: value });
  }

  if (isLoadingSettings) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          disabled={isUpdatingSettings}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
          disabled={isUpdatingSettings}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guests_per_booking}
          disabled={isUpdatingSettings}
          onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          disabled={isUpdatingSettings}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
