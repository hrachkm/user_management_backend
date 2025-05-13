# Requerimientos para ejecutar la api
    - Docker
    - Nodejs ( version 20.17.0 )

Para inicializar la api se deben seguir los siguientes pasos

# 1 - Implementación de la base de datos
    - Ejecutar el comando docker compose up -d para implementar postgres
    - Las credenciales para acceder la base de datos son:
        - POSTGRES_USER=test
        - POSTGRES_PASSWORD=123456
        - POSTGRES_DB=user_management

# 2 - Inicializar el servidor
    - Asegurarse de tener la versión de node 20.17.0, si esta usando nvm solo debe ejecutar 'nvm use'
    - Instalar las dependencias con 'npm install'
    - Inicializar la api con el comando 'npm run dev'

# 3 - Validar que la base de datos este inicializada
    - Puede utilizar pgadmin o tableplus para verificar la base de datos