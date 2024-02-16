import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { isLoading: isGettingSettings, data: settings, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isGettingSettings, settings, error };
}
