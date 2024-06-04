import { useState } from "react";

export const Backend = () => {
    const [url, setUrl] = useState("http://192.168.100.29/Conexion/Services");

    return { url };
}
