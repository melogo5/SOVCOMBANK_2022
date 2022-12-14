const host = "http://localhost";
const port = "8080";

const api = async (method: string, data?: any): Promise<any> => {
  try {
    return await fetch(`${host}:${port}/api/${method}`, {
      method: "post",
      body: data ? JSON.stringify(data) : null,
    }).then(r => r.json())
  } catch (e) {
    console.error(e)
  }
}

export default api;
