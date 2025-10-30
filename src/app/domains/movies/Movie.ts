export default class Movie {
  public id: number;
  public title: string;
  public description?: string | null;
  public releaseYear?: number | null;
  public rating?: number | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: {
    id: number;
    title: string;
    description?: string | null;
    releaseYear?: number | null;
    rating?: number | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.description = params.description ?? null;
    this.releaseYear = params.releaseYear ?? null;
    this.rating = params.rating ?? null;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  // Exemplo de método de domínio simples
  public isClassic(): boolean {
    return !!this.releaseYear && this.releaseYear <= 1980;
  }
}
