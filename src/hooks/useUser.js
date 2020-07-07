import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";
import getDummyUser from "../services/backend/getDummyUser";

export default function useUser() {
  const [user, setUser] = useLocalStorage("user", {});

  useEffect(() => {
    async function checkIfUser() {
      if (!user || !user.user) {
        const u = await getDummyUser();
        if (u) {
          setUser(u);
        }
      }
    }
    checkIfUser();
  }, []); // eslint-disable-line

  return [user, setUser];
}
