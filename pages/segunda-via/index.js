import React, { use } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Typography } from '@mui/material';
import { postSegundaViaAdrian } from '@/api/api';

export const SegundaVia = () => {

    const [cpf, setCpf] = useState('')
    const [numCartao, setNumCartao] = useState('')
    const [usuario, setUsuario] = useState(null)
    const [cartoes, setCartoes] = useState([])
    const [currentStep, setCurrentStep] = useState(0)

    const handleCpf = (e) => {
        setCpf(e.target.value)
    }

    const handleNumCartao = (e) => {
        setNumCartao(e.target.value)
    }

    const handleCartaoChange = (e) => {
        setNumCartao(e.target.value)
    }

    const handleConfirmar = async () => {
        
        try {
            const response = await fetch(`/api/empresa1/usuario/pessoa/cpf/${cpf}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log(response)

            if (response.status == 204) {
                alert('Usuário não encontrado!')
                return
            }

            if (response.status == 200 ) {
                alert("Usuário encontrado!");
                const data = await response.json();
                const cartoes = data.pessoa.cartoes;
                const usuario = data.pessoa;

                
                const infoCartoes = cartoes
                    .map(cartao => {
                        const areaPrioritaria = cartao.areas.find(area => area.tipoPrioritario === 1);
                        if ((areaPrioritaria && cartao.status === "A") ) {
                            return {
                                usuarioId: cartao.usuarioId,
                                cartaoId: cartao.cartaoId,
                                tipoCartaoId: areaPrioritaria.tipoCartaoId,
                                numeroSerieCartao: cartao.numeroSerieCartao,
                                entidadeId: areaPrioritaria.entidadeId,
                                saldo: areaPrioritaria.saldo,
                                status: areaPrioritaria.status,
                                dataValidade: areaPrioritaria.dataValidade,
                                permiteRecarga: areaPrioritaria.permiteRecarga,
                                tipoCartao: areaPrioritaria.tipoCartaoDesc
                            };
                        }
                    })
                    .filter(Boolean); // Remove the undefined values if no prioritary area is found
                    

                setCartoes(infoCartoes);
                setUsuario(usuario);
                setCurrentStep(1);

                console.log(infoCartoes);
                console.log(usuario);




    
               
    
            } else {
                alert("Erro ao encontrar usuário!");
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleSegundaVia = async () => {
        try {
            const response = await fetch(`/api/adrian/segunda-via`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "cpf": cpf,
                    "numeroSerieCartao": numCartao
                }),
            })

            console.log(response)

            if (response.status == 200 ) {
                alert("Segunda via solicitada com sucesso!");
            } 

            if (response.status == 409 ) {
                alert("Segunda via já solicitada!");
            }

            if (response.status == 500 ) {
                alert("Erro ao solicitar segunda via!");
            }



        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '70vw', margin: 'auto', marginTop:'24px' }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Segunda via
                </Typography>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '70vw', margin: 'auto' }}>

                <TextField
                    id="outlined-basic"
                    label="CPF"
                    variant="outlined"
                    placeholder="CPF"
                    onChange={handleCpf}
                    type='number'

                />

                
                <Button variant="outlined" onClick={handleConfirmar}>Confirmar</Button>
                
            </div>
            
            {currentStep >= 1 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '70vw', margin: 'auto' }}>
                <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={numCartao}
                label="Age"
                onChange={handleCartaoChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cartoes.map((cartao) => (
                    <MenuItem value={cartao.numeroSerieCartao}>{cartao.numeroSerieCartao} - {cartao.tipoCartao}</MenuItem>
                ))}
                </Select>
                <Button variant="outlined" onClick={handleSegundaVia}>Segunda via</Button>
                </div>

            ) : (
                <div></div>
            )}

        </div>
    )
}

export default SegundaVia