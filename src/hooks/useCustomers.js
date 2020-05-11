import { useCallback, useEffect } from "react";
import postData from "../services/backend/postData";
import useLocalStorage from "./useLocalStorage";
import getData from "../services/backend/getData";
export default function useCustomers() {
  const [customers, setLocalStorageCustomers] = useLocalStorage(
    "customers",
    []
  );

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      if (data && data.customers) {
        setLocalStorageCustomers(data.customers);
      }
    }
    fetchData();
  }, []);

  const addCustomer = useCallback(
    (customer) => {
      const _customers = [...customers, customer];
      setLocalStorageCustomers(_customers);
      postData({ customers: _customers });
    },
    [customers]
  );

  const removeCustomer = useCallback(
    (customerId) => {
      const _customers = [...customers];
      _customers[customerId] = undefined;
      setLocalStorageCustomers(_customers);
      postData({ customers: _customers });
    },
    [customers]
  );

  const updateCustomer = useCallback(
    (customer) => {
      const _customers = [...customers];
      _customers[customer.id] = customer;
      setLocalStorageCustomers(_customers);
      postData({ customers: _customers });
    },
    [customers]
  );
  return [customers, addCustomer, removeCustomer, updateCustomer];
}
