export async function fetchCryptoPrices() {
  const apiUrl = "https://api.coingecko.com/api/v3/simple/price";
  const params: any = {
    ids: "bitcoin,ethereum",
    vs_currencies: "idr",
    include_market_cap: true,
    include_24hr_vol: false,
    include_24hr_change: false,
    include_last_updated_at: true,
    precision: 0,
  };

  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");

  const url = `${apiUrl}?${queryString}`;

  try {
    const prices = await fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    });

    return prices;
  } catch (error) {
    console.log("Fetch error: ", error);
  }
}
