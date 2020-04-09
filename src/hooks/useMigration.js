import migration from "../migration";
import { useMemo } from "react";

export default function useMigration() {
  useMemo(() => {
    migration();
  });
}
