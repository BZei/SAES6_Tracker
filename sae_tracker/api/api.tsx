const BASE_URL = "http://localhost:3000/api";


export const getSaes = async () => {
  const res = await fetch(`${BASE_URL}/saes`);
  return res.json();
};

export const getSaeById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/saes/${id}`);
  return res.json();
};

export const createSae = async (data: any) => {
  try {
    const res = await fetch(`${BASE_URL}/saes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

export const updateSae = async (id: number, data: any) => {
  const res = await fetch(`${BASE_URL}/saes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteSae = async (id: number) => {
  const res = await fetch(`${BASE_URL}/saes/${id}`, {
    method: "DELETE",
  });
  return res.json();
};