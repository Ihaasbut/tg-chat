export interface GreenApiInstance {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;
}

export function getInstance(locationState: unknown) {
  if (
    locationState &&
    typeof locationState === "object" &&
    "instance" in locationState
  ) {
    const { instance } = locationState as { instance?: GreenApiInstance };

    if (instance) {
      return instance;
    }
  }

  return null;
}
