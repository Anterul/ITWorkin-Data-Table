type DynamicUrl = {
  [key: string]: string;
};

export const urlForApi: DynamicUrl = {
  character: "https://rickandmortyapi.com/api/character?page=2&length=15",
  location: "https://rickandmortyapi.com/api/location",
};
