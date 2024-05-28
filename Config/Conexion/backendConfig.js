import { useState } from "react";

export const Backend = () => {
    const [url, setUrl] = useState("http://192.168.1.75/Conexion/service/");

    return { url };
}
