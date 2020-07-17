import { useCallback, useEffect, useContext } from "react";
import postService from "../services/backend/postService";
import getServices from "../services/backend/getServices";
import { Context } from "../store/Store";

export default function useServices() {
  const [state, dispatch] = useContext(Context);

  const services = state.services;

  const setServices = (services) => {
    dispatch({ type: "SET_SERVICES", payload: services });
  };

  async function fetchServices() {
    const services = await getServices();
    if (services) {
      setServices(services);
    }
  }

  useEffect(() => {
    if (services && services.length === 0) {
      fetchServices();
    }
  }, []); //eslint-disable-line

  const addService = async (service) => {
    const _service = await postService(service);
    if (_service) {
      setServices([...services, _service]);
    }
  };

  const removeService = async (id) => {
    await postService({ _id: id, deleted: true });
    fetchServices();
  };

  const updateService = async (service) => {
    await postService(service);
    fetchServices();
  };

  const getServiceById = useCallback(
    (id) => {
      return services.find((a) => a._id === id);
    },
    [services]
  );

  return [
    services.filter((a) => a && typeof a === "object" && !a.deleted),
    addService,
    removeService,
    updateService,
    services.length,
    getServiceById,
  ];
}
