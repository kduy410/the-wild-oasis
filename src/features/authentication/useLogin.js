import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user)
            navigate("/dashboard", { replace: true })
        },
        onError: () => {
            toast.error("Provide a valid email and password")
        }
    })
    return {
        login,
        isLoading,
    }
}