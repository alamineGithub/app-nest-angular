import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créer une nouvelle source de données avec TypeORM
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST, // Utilise les variables d'environnement
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'], // Chemin des entités
  synchronize: true,
});

// Initialiser la source de données
dataSource
  .initialize()
  .then(() => {
    console.log('La base de données est connectée avec succès');
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données', error);
  });
