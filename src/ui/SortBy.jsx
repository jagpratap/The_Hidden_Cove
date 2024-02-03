import { useSearchParams } from "react-router-dom";

import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleSort(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      type="white"
      options={options}
      value={sortBy}
      onChange={handleSort}
    />
  );
}

export default SortBy;
