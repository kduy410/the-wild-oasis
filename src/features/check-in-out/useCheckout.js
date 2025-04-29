import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckout() {
    const queryClient = useQueryClient();

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-out", }),
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} successfully checked out`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: (error) => {
            toast.error("There was an error checking out the booking. Please try again later.");
            console.error(error);
        },

    });
    return { checkout, isCheckingOut }
}