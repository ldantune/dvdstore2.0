import { Model } from '../core/model';

export class Cliente extends Model { 
    nome: string;
    sobrenome: string;
    cpf?: string;
    endereco: string;
    complemento: string;
    cidade: string;
    estado: string;
    telefone: string;
    celular: string;
    email: string;
    ativo?: boolean;
    datacriacao?: Date;
    dataatualizacao?: Date;
}