import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import toast from "react-hot-toast";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (error) {
    toast.error("An error occurred. Please try again later.");
  }

  if (isLoading) return <Spinner />

  if (!cabins.length) {
    return <Empty resourceName={'cabins'} />
  }
  // 1. FILTER
  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins = filterValue === "no-discount" ? cabins.filter(cabin => cabin.discount === 0) : filterValue === "with-discount" ? cabins.filter(cabin => cabin.discount > 0) : cabins;
  // 2. SORT
  const sortValue = searchParams.get("sortBy") || "name-asc";
  const [sortField, sortOrder] = sortValue.split("-");
  const modifiedSortOrder = sortOrder === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => sortField === "name" ? a[sortField].localeCompare(b[sortField]) * modifiedSortOrder : (a[sortField] - b[sortField]) * modifiedSortOrder
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
        <Table.Body data={sortedCabins} render={(cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        )}>
        </Table.Body>
      </Table>
    </Menus>
  )
}
