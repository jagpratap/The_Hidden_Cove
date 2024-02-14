import { useSearchParams } from "react-router-dom";

import { useCabins } from "./useCabins";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import CabinRow from "./CabinRow";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoadingCabins, cabins } = useCabins();

  if (isLoadingCabins) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * (direction === "asc" ? 1 : -1)
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
