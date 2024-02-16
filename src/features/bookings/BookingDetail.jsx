import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { STATUS_COLOR_CODE } from "../../utils/constants";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import BookingDataBox from "./BookingDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { isGettingBooking, booking } = useBooking();
  const { isCheckingOut, handleCheckout } = useCheckout();
  const { isDeletingBooking, handleDeleteBooking } = useDeleteBooking();

  if (isGettingBooking) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading>Booking #{bookingId}</Heading>
          <Tag type={STATUS_COLOR_CODE[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>

        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => handleCheckout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={() =>
                handleDeleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
