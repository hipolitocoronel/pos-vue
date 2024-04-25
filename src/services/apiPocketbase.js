import Pocketbase from "pocketbase";

const pb = new Pocketbase(import.meta.env.VITE_BACKEND_URL);

export { pb };
