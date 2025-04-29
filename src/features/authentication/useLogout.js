import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true })
        },
        onError: () => {
            toast.error("Logout failed")
        }
    })
    return {
        logout,
        isLoading,
    }
}