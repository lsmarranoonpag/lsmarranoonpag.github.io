import { getUsuarioEmpresa1 } from "@/api/api";

export default async function handler(req, res) {
    try {
        const { cpf } = req.query; // extract cpf from query parameters
        const usuario = await getUsuarioEmpresa1(cpf); // pass cpf to getUsuarioEmpresa1 function
        console.log(usuario);
        if (usuario.codigo == 204 ) {
            res.status(204).json({message: "Usuário não encontrado!"});
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }}

