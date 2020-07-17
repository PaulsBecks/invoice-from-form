import { useEffect, useState } from "react";
import getCurrentSubscription from "../services/backend/getCurrentSubscription";

export default function useCurrentSubscription() {
  const [currentSubscription, setCurrentSubscription] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const currentSubscription = await getCurrentSubscription();
      setCurrentSubscription(currentSubscription);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return [currentSubscription, isLoading];
}
