import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deletebookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn: deletebookingApi,
        onSuccess: () => {
            toast.success("Booking deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { deleteBooking, isDeleting };
}