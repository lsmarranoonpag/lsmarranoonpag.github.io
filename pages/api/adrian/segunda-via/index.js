import { postSegundaViaAdrian } from "@/api/api";

export default async function handler(req, res) {
    try {
        const response = await postSegundaViaAdrian(req.body);

        

        

        res.status(200).json(response);
    } catch (error) {
        if (error.response.status == 409 ) {
            res.status(409).json({message: "Segunda via já solicitada!"});
        }
        res.status(500).json(error);
        console.error(error);
    }
}