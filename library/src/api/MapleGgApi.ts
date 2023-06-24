const get = async (username: string) => {
  // const response = await fetch(`https://api.maplestory.gg/v2/public/character/gms/${username}`)
  // return await response.json()
  return {};
};

// const mapleGgData = MapleGgApi.get('nùms').then((data) => {
//     console.log(data);
// }).catch((err) => {
//     alert(err);
// });

export const MapleGgApi = {
  get,
};
