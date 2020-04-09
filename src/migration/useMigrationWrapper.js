import { useLocalStorage } from "../hooks";

export default function useMigrationWrapper(migrate, version) {
  const [currentVersion, setCurrentVersion] = useLocalStorage("version", "1");
  if (parseInt(currentVersion) < version) {
    migrate();
  }
  setCurrentVersion(version);
}
