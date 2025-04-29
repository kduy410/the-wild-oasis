import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {
  const { settings: {
    minBookingLength,
    maxBookingLength,
    maxGuests,
    breakfastPrice
  } = {}, isLoading, error } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleUpdate(event, field) {
    const { value } = event.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (error) {
    return <p>An error occurred. Please try again later.</p>;
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'minBookingLength')} />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'maxBookingLength')}/>
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuests} disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'maxGuests')}/>
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'breakfastPrice')}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
