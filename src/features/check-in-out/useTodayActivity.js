import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export default function useTodayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
  return { activities, isLoading };
}
