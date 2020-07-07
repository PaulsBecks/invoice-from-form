import { useEffect, useState, useCallback } from "react";
import getCustomers from "../services/backend/getCustomers";
import postCustomer from "../services/backend/postCustomer";

export default function useCustomers() {
  const [customers, setCustomers] = useState([]);

  async function fetchCustomers() {
    const customers = await getCustomers();
    if (customers) {
      setCustomers(customers);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async (customer) => {
    await postCustomer(customer);
    fetchCustomers();
  };

  const removeCustomer = async (customerId) => {
    await postCustomer({ _id: customerId, deleted: true });
    fetchCustomers();
  };

  const updateCustomer = async (customer) => {
    await postCustomer(customer);
    fetchCustomers();
  };

  const getCustomerById = useCallback(
    (id) => {
      return customers.find((c) => c._id === id);
    },
    [customers]
  );

  return [
    customers.filter((c) => c && typeof c === "object" && !c.deleted),
    addCustomer,
    removeCustomer,
    updateCustomer,
    customers.length,
    getCustomerById,
  ];
}
