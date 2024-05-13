# Instalamos la versión 20.12.1 de NodeJS
FROM node:20.12.1

# Le indicamos que vamos a estar trabajando sobre el directorio /app
WORKDIR /app

# Copiamos toda la app al ./ del docker, es decir, el directorio raíz de la app
COPY /app /app

# Cargamos todas las dependencias
RUN apt-get update && apt-get install -y git
RUN npm install

# Copiamos el archivo SQL a la carpeta /app dentro del contenedor
COPY ./data/bd.sql /app

# Ejecutamos el proyecto
CMD  ["npm", "start"]