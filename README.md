# pacc-desktop
Sistema para administración de cuentas MZone

1.- Descargar (clonar) el codigo

2.- Entrar a la carpeta del proyecto

3.- Ejecutar: npm install

4.- Para ejecutar la aplicacion como aplicacion de escritorio, ejecutar: npm run electron-build

5.- Pare ejecutar la aplicacion como aplicacion web, ejecutar: npm start y abrir el navegador con la siguiente url localhost:4200

6.- Si las peticiones marcan error de CORS, abrir el navegador en modo desarrollador 
    https://stackoverflow.com/questions/56328474/origin-http-localhost4200-has-been-blocked-by-cors-policy-in-angular7
    respuesta 8

    Para pruebas temporales durante el desarrollo, podemos deshabilitarlo abriendo Chrome con seguridad web deshabilitada como esta.
    Abra el terminal de la línea de comandos y vaya a la carpeta donde está instalado Chrome, es decir, C:\Program Files\Google\Chrome\Application
    Ingrese este comando:
    chrome.exe --user-data-dir="C:/Sesión de desarrollo de Chrome" --disable-web-security
    Se abrirá una nueva ventana del navegador con la seguridad web deshabilitada. Úselo solo para probar su aplicación.

