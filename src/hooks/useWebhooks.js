import postWebhook from "../services/backend/postWebhook";
import getWebhooks from "../services/backend/getWebhooks";
import { useState, useEffect } from "react";

export default function useWebhooks() {
  const [webhooks, setWebhooks] = useState([]);

  async function fetchWebhooks() {
    const webhooks = await getWebhooks();
    if (webhooks) {
      setWebhooks(webhooks);
    }
  }

  useEffect(() => {
    fetchWebhooks();
  }, []);

  async function addWebhook() {
    await postWebhook();
    fetchWebhooks();
  }

  async function removeWebhook(id) {
    await postWebhook({ _id: id, deleted: true });
    fetchWebhooks();
  }

  return [
    webhooks.filter((wh) => wh && typeof wh === "object" && !wh.deleted),
    addWebhook,
    removeWebhook,
  ];
}
