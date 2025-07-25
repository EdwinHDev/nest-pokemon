<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Levantar proyecto en desarrollo

1. Clonar el repositorio
```
https://github.com/EdwinHDev/nest-pokemon
```
2. Ejecutar comando
```
npm install
```
3. Tener Nest CLI instalado (Ejecutar como administrador)
```
npm i -g @nestjs/cli
```
4. Instalar base de datos (Mongodb)
  * Tener docker desktop instalado
```
docker compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```
6. Definir las variables de entorno en el archivo ```.env```
7. Ejecutar el proyecto con el comando
```
npm run start:dev
```
8. Ejecuta el seed con la url de desarrollo
```
http://localhost:3000/api/v2/seed
```

## Stack
* Nestjs
* Mongodb