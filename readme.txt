Desplegar base de datos Postgress en Render.com
✅ Pasos para publicar una base de datos PostgreSQL en Render.com:
1. Crear una cuenta en Render (si no tienes una)
Ve a https://render.com

Regístrate o inicia sesión con tu cuenta de GitHub o correo.

2. Crear una base de datos PostgreSQL
Una vez dentro del panel de Render:

Haz clic en el botón "Add new" (nuevo) y selecciona "Postgres".

Asigna un nombre a tu base de datos.
postgres

Elige la región del servidor (elige la más cercana a tus usuarios o a tus servicios).

PostgreSQL version: 16 (Por defecto. Podemos saber la version de nuestra base de datos en pgadmin en Herramienta de 
consulta poniendo SELECT version(); )

Datadog Region Optional: EU (por defecto US1, lo cambio a EU)

Selecciona el plan (Render ofrece un plan gratuito limitado a 256 MB).

Haz clic en "Create Database". SOLO DURA UN MES EN MODO GRATUITO.

3. Esperar a que se cree la base de datos
Render tardará unos minutos en aprovisionar tu base de datos.

4. Obtener las credenciales de conexión
Cuando esté lista, verás algo como:
Hostname: dpg-d12ahjs9c44c7384n6r0-a
Port: 5432
Database: postgres_37d6
Username: postgres_37d6_user
Password: czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y
Internal Database URL : postgresql://postgres_37d6_user:czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y@dpg-d12ahjs9c44c7384n6r0-a/postgres_37d6
External Database URL (de aqui sacamos el host dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com):
    postgresql://postgres_37d6_user:czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y@dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com/postgres_37d6
PSQL command: PGPASSWORD=czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y psql -h dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com -U postgres_37d6_user postgres_37d6

Con estos datos nuestro db-pg.js tendrá el siguiente contenido:
*********************************
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres_37d6_user',
  host: 'dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com',
  database: 'postgres_37d6',
  password: 'czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
*********************************
IMPORTANTE: Render usa SSL para conexiones externas, así que debes poner la opción ssl: { rejectUnauthorized: false } para
 que no dé error.


******************************
Para consultar tu base de datos PostgreSQL alojada en Render, tienes varias opciones, dependiendo de si quieres usar una herramienta gráfica, la línea de comandos o conectarte desde tu aplicación. Te resumo las más comunes:

1. Consultar con un cliente GUI (como pgAdmin, DBeaver, TablePlus, DataGrip, etc.)
Usa estos datos que Render te da para configurar la conexión:

Parámetro	Valor
Host	dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com
Puerto	5432
Base de datos	postgres_37d6
Usuario	postgres_37d6_user
Contraseña	czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y
SSL	Sí (habilita SSL y pon que no rechace certificados no autorizados, o usa opción equivalente)

Ejemplo en pgAdmin:

Server name: lo que quieras poner

Host name/address: dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com

Port: 5432

Maintenance DB: postgres_37d6

Username: postgres_37d6_user

Password: ex

SSL mode: Require (o similar)

2. Consultar usando psql (línea de comandos)
Desde tu terminal, si tienes psql instalado, ejecuta:

bash
Copiar
Editar
PGPASSWORD=czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y psql \
  -h dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com \
  -U postgres_37d6_user \
  -d postgres_37d6 \
  --set=sslmode=require
O si tu psql no soporta --set=sslmode=require, intenta exportar la variable de entorno:

bash
Copiar
Editar
export PGSSLMODE=require
PGPASSWORD=czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y psql \
  -h dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com \
  -U postgres_37d6_user \
  -d postgres_37d6
3. Consultar desde tu aplicación (Node.js o cualquier otro lenguaje)
Como te expliqué antes, configura la conexión con SSL habilitado, usando la configuración que te pasé en db-pg.js.

Resumen
Usa el host externo que termina en .frankfurt-postgres.render.com

Puerto 5432

SSL habilitado (muy importante)

Usuario, contraseña y base de datos según los datos que Render te dio

******************************
DESPLEGANDO EN RENDER EL BACKEND
OJO CADA CAMBIO EN EL PROJECTO DE FRONTEND/BACKEND SUBIR A GIT
OJO EL INDEX.JS NO USAR HOSTNAME EN app.listen, QUITARLO PARA QUE USE POR DEFECTO 0.0.0.0
DESDE DASHBOARD
add new
    web service
public git repository
    https://github.com/JasonRodriguezGarcia/eurovision
        connect
Name 
    eurovision
Language
    Automaticamente detecta el entorno NODE
Root Directory
    backend
Build Command
    npm install
Start Command
    node index.js
Instance Type
    FREE
DEPLOY WEB SERVICE para empezar a desplegar. Tarda unos minutos.
Una vez desplegado si todo esta OK, arriba nos aparece el url para llamar desde frontend
OJO HAY QUE REEMPLAZAR EN FRONTEND EN TODAS LAS LLAMADAS CON FETCH
    https://eurovision-g8lw.onrender.com

DESPLEGANDO EN RENDER FRONTENT
OJO CADA CAMBIO EN EL PROJECTO DE FRONTEND/BACKEND SUBIR A GIT
Add new
    static site
public git repository
    https://github.com/JasonRodriguezGarcia/eurovision
        connect
Name 
    eurovision-1
Root Directory
    frontend
Publish Directory
    dist para VITE / build para React (LOS DIRECTORIOS dist ó build deben estar creados antes en el repositorio)
DEPLOY STATIC SITE
Una vez desplegado si todo esta OK, arriba nos aparece el url para llamar desde navegador
    https://eurovision-1.onrender.com/






******************************
******************************
INFORMACION ADICIONAL 
******************************
******************************
MODIFICAR EL BACKEND PARA SU DESPLIEGE Y  PARA PODER USAR BASE DE DATOS POSTGRES YA DESPLEGADA EN INTERNET

✅ Cambios que necesitas hacer
1. Modificar tu db-pg.js para usar Render
Render te proporciona una URL como esta (puede variar):

bash
postgres://usuario:contraseña@servidor.render.com:5432/nombre_db
🔄 Actualiza db-pg.js así:

js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ¡importante!
  ssl: {
    rejectUnauthorized: false, // necesario para Render
  },
});

export default pool;
🛠️ Crea un .env en tu proyecto:
env
DATABASE_URL=postgres://usuario:contraseña@servidor.render.com:5432/nombre_db
⚠️ Asegúrate de agregar .env a tu .gitignore para no subir tus credenciales.

2. Instalar dotenv (si no lo tienes ya)
bash
npm install dotenv
Y en tu archivo principal (como index.js o app.js), al principio agrega:
import dotenv from 'dotenv';
dotenv.config();
3. Opcional: cambiar el hostname del servidor

En tu archivo principal tienes:
const HOSTNAME = "127.0.0.1"
Para despliegue en Render, puedes cambiarlo por:
const HOSTNAME = "0.0.0.0"; // permite recibir conexiones externas
Y asegúrate de que usas:
const PORT = process.env.PORT || 5000;
Render establecerá PORT automáticamente.

🧪 Probar
Ahora puedes probar:

Tu backend se conecta a la base de datos en Render

Los endpoints /api/v1/eurovision/votantes, /votos, etc. funcionan como antes

**************
DATOS PARA SUPABASE

postgresql://postgres:[YOUR-PASSWORD]@db.slipxykygueybdeveqtx.supabase.co:5432/postgres

# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.slipxykygueybdeveqtx:[YOUR-PASSWORD]@aws-0-eu-west-3.pooler.supabase.com:5432/postgres"

#datos de supabase
DATABASE_USER: postgres.slipxykygueybdeveqtx
DATABASE-HOST: aws-0-eu-west-3.pooler.supabase.com
DATABASE_DATABASE: postgres
DATABASE_PASSWORD: 1Jason2Rosita4
DATABASE_PORT: 5432
