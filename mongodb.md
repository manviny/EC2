
#Crear usuario para manejar todas las bases de datos
```bash
> use admin
> db.auth("admin", "password")
> db.addUser({ user:"boss", pwd:"password", roles:["userAdminAnyDatabase"] })
```

#Roles de mongodb
[roles documentación de mongo](http://docs.mongodb.org/manual/reference/built-in-roles/)

```bash
# versión
$ mongod --version
# arrancar mongo
$ mongo
# nos sale el puntero de mongo
> _
# listar comandos de mongo [ help | db.help | de.help() ]
> help       
# OBTENER PERMISOS
> use admin
> db.auth("admin", "password")
# mostar bases de datos
> show dbs
```
### NOTA si nos da un fallo de permisos ir a 
[crear usuario para manejar todas las bases de datos](https://github.com/manviny/MongoDB/wiki/Usuarios)

```bash
# crear base de datos una vez introducimos algún dato
> use miPrimeraBD
# introducir datos en colección de la BD 
> db.amigos.insert({nombre:"Juan", telefono: "123456789", direccion: "Rue del Percebe, 13"})
# Mostrar colecciones de la BD actual
> show collections
# Buscar elementos dentro de una coleccion de la BD
> db.micoleccion.find()
```

###ejercicio
```bash
$ mongo
> use admin
> db.auth("root", "passw")
> use mibd
> db.amigos.insert({nombre: "Juan", telefono: 663423534, direccion: "Rue del Percebe"})
> db.amigos.find()  

> db.amigos.remove({telefono: 663423534}) // borra el registro COMPLETO  

# Busca un registro con nombre valor Juan 
# y CUIDADO lo sustituye por el segundo parámetro, borrando lo que hubiera
> db.amigos.update({nombre: "Juan"},{nombre: "Pedro"}) 

# Busca un registro con nombre valor Pedro y cambia/añade campos indicados
> db.amigos.update({nombre: "Pedro"},{$set:{telefono: 610334455, edad: 28 }})

> db.dropDatabase()  // CUIDADO, borra la bd en la que nos encontramos.


```

