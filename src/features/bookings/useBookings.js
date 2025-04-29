import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // 1. FILTER
    const filterValue = searchParams.get("status") || "all";
    const filter = !filterValue || filterValue === "all" ? null : { field: 'status', value: filterValue, method: 'eq' };

    // 2. SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [sortField, sortOrder] = sortByRaw.split("-");
    const sortBy = { field: sortField, order: sortOrder };

    // 3. PAGINATION
    const page = Number(searchParams.get("page")) || 1;

    // Query to fetch bookings
    const { data: { data: bookings, count } = {}, isLoading, error } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    })
    // PRE-FETCHING
    const totalPages = Math.ceil(count / PAGE_SIZE);

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        })
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        })
    }

    return { bookings, isLoading, error, count };
}