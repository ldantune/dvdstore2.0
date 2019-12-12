import { Model } from '../core/model';
import { Ator } from './ator.model';
import { Filme } from './filme.model';

export class AtorFilme extends Model {
    ator: Ator;
    filme: Filme;
    dataatualizacao: Date;
}