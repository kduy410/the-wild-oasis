import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;
export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    //1. Check if the user is authenticated
    const { isLoading, isAuthenticated } = useUser();
    //3. If not authenticated, show a message and redirect to the login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);
    //2. If loading, show a spinner
    if (isLoading) {
        return <FullPage>
            <Spinner />
        </FullPage>;
    }
    //4. Use react-router-dom's useNavigate to redirect
    if (isAuthenticated) {
        return children;
    }
}
