export const getJSON = async function (url) {
  try {
    const data = await fetch(url);
    const res = await data.json();
    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const toTitleCase = function (str) {
  return str.replace(/\p{L}+('\p{L}+)?/gu, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  });
};
