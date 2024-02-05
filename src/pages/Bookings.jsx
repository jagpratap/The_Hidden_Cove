import Row from "../ui/Row";
import Heading from "../ui/Heading";

import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
