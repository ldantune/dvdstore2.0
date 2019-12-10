import { Model } from '../core/model';

export class Usuario extends Model {
    nome: string;
    sobrenome: string;
    endereco: string;
    cidade: string;
    estado: string;
    telefone: string;
    celular: string;
    email: string;
    password?: string;
}