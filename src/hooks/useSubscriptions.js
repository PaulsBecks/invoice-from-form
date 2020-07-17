import { useCallback, useEffect, useContext } from "react";
import postSubscription from "../services/backend/postSubscription";
import getSubscriptions from "../services/backend/getSubscriptions";
import { Context } from "../store/Store";

export default function useSubscriptions() {
  const [state, dispatch] = useContext(Context);

  const subscriptions = state.subscriptions;

  const setSubscriptions = (subscriptions) => {
    dispatch({ type: "SET_SUBSCRIPTIONS", payload: subscriptions });
  };

  async function fetchSubscriptions() {
    const subscriptions = await getSubscriptions();
    if (subscriptions) {
      setSubscriptions(subscriptions);
    }
  }

  useEffect(() => {
    if (subscriptions && subscriptions.length === 0) {
      fetchSubscriptions();
    }
  }, []);

  const addSubscription = async (subscription) => {
    const _subscription = await postSubscription(subscription);
    if (_subscription) {
      setSubscriptions([...subscriptions, _subscription]);
    }
  };

  const removeSubscription = async (id) => {
    await postSubscription({ _id: id, deleted: true });
    fetchSubscriptions();
  };

  const updateSubscription = async (subscription) => {
    await postSubscription(subscription);
    fetchSubscriptions();
  };

  const getSubscriptionById = useCallback(
    (id) => {
      return subscriptions.find((a) => a._id === id);
    },
    [subscriptions]
  );

  return [
    subscriptions.filter((a) => a && typeof a === "object" && !a.deleted),
    addSubscription,
    removeSubscription,
    updateSubscription,
    subscriptions.length,
    getSubscriptionById,
  ];
}
