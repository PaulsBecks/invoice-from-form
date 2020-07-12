import { useEffect, useCallback, useContext } from "react";
import getCustomers from "../services/backend/getCustomers";
import postCustomer from "../services/backend/postCustomer";
import { Context } from "../store/Store";

export default function useCustomers() {
  const [state, dispatch] = useContext(Context);

  const customers = state.customers;

  const setCustomers = (customers) => {
    dispatch({ type: "SET_CUSTOMERS", payload: customers });
  };

  async function fetchCustomers() {
    const customers = await getCustomers();
    if (customers) {
      setCustomers(customers);
    }
  }

  useEffect(() => {
    if (customers && customers.length === 0) {
      fetchCustomers();
    }
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
    const c = await postCustomer(customer);
    fetchCustomers();
    return c;
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
