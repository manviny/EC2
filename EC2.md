
## Permitir acceder a un puerto desde una sola IP
  1. Entramos en la consola de AWS
  2. Vamos a servicios -> EC2
  3. En el menú izquierdo pulsamos Security Groups y seleccionamos el que tenemos asociado a nuestro instancia (servidor)
  4. En el menú horizontal que se encuentra a media pantalla pulsamos:
      - **Inbound** > edit, 
      - **Add Rule** 
      - Type->Custom TCP, 
      - Port Range -> 10000 y 
      - en source -> My IP
  5. Ahora ya podemos acceder desde nuestra conexión a internet al puerto 10000 de nuestra instancia/servidor 


## Acceder al servidor mediante putty
  - Se necesita la llave millave.pem
  - Download your .pem from AWS
  - Open PuTTYgen, select Type of key to generate as: SSH-2 RSA
  - Click "Load" on the right side about 3/4 down
  - Set the file type to *.*
  - Browse to, and Open your .pem file
  - PuTTY will auto-detect everything it needs, and you just need to click "Save private key" and you can save your ppk key for use with PuTTY
