import { Model } from '../core/model';
import { Diretor } from './diretor.model';
import { Categoria } from './categoria.model';
import { Produtora } from './produtora.model';

export class Filme extends Model {
    titulo: string;
    descricao: string;
    anolancamento: Date;
    duracaoaluguel: number;
    taxaaluguel: number;
    duracaofilme: number;
    custoreposicao: number;
    avaliacaofilme: string;
    classificacao: number;
    dataatualizacao: Date;
    diretor: Diretor;
    categoria: Categoria;
    produtora: Produtora;

}