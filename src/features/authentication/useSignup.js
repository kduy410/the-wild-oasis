import { useMutation } from "@tanstack/react-query"
import { signup as signUpApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

export default function useSignup() {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (data) => {
            console.log("User created successfully", data);
            toast.success("User created successfully");
        },
        onError: () => {
            toast.error("Error creating user");
        },
    })

    return {
        signup,
        isLoading,
    }
}
