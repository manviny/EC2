[back](./)

```bash
npm init
npm install nightmare
npm install vo
npm install nodemailer

```
```js
function jQuery(doc){
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const { window } = new JSDOM();
    const JQ = require("jquery")(window)(`<html>${doc || ''}</html>`);
}
var $ = jQuery;

var Nightmare = require('nightmare');
var vo = require('vo');
var nodemailer = require('nodemailer');

/**************************************************************
        Control Errores general
**************************************************************/ 
vo(run)(function(err, result) {
    if (err) throw err;
});

function* run() {
    try{
        /**************************************************************
                Configuracion
        **************************************************************/    
        // var nightmare = Nightmare({ show: true, height: 900 }), 
        var nightmare = Nightmare({}), 
            MAX_PAGE = 50, 
            currentPage = 2, 
            nextExists = true, 
            links = [];

        /**************************************************************
                1er pase
        **************************************************************/
        yield nightmare 
            .goto('http://cefire.edu.gva.es/sfp/index.php?seccion=ediciones&filtro_titulo=&filtro_ambito=&filtro_nivel=&filtro_estado=inscripcion')
            .wait('a.pagina')
            // .screenshot("test.png")
            .wait(2000)

        nextExists = yield nightmare.visible('a[class="nohref"]'); 

        /**************************************************************
                recorre todas las paginas y extrae datos
        **************************************************************/
        while (nextExists && currentPage < MAX_PAGE) { 
            // listado = listado.concat(result);
            links = links.concat(yield nightmare 
            // links.push(yield nightmare 
                .evaluate(function() { 

                    var linkArray = [];
                    var cursos = [];

                    $('#mantenimiento tr').each(function(index, element){
                        item = {}
                        // GET table columns and remove tab and newline
                        item.titulo = $(this).find("td:nth-child(2)").text().replace(/\n|\r|\t/g, "")
                        item.enlace = 'http://cefire.edu.gva.es/sfp/'+$(this).find("td:nth-child(2) a").attr('href')
                        item.localidad = $(this).find("td:nth-child(3)").text().replace(/\n|\r|\t/g, "")
                        item.inicio = $(this).find("td:nth-child(4)").text().replace(/\n|\r|\t/g, "")
                        item.fin = $(this).find("td:nth-child(5)").text().replace(/\n|\r|\t/g, "")
                        item.horas = $(this).find("td:nth-child(6)").text().replace(/\n|\r|\t/g, "")
                        
                        cursos.push(item)
                    })  

                    cursos.shift();
                    return cursos
                })); 

            /**************************************************************
                    Pagination, siguiente pagina
            **************************************************************/
            yield nightmare 
                .click('a[onclick="cargarURLPaginas(\'seccion=ediciones&pagina='+currentPage+'\');"]')
                .wait(2000)

            currentPage++; 
            nextExists = yield nightmare.visible('a[class="nohref"]'); 
        } 

     
        // console.log(  links ); 
        yield nightmare.end(); 

    /**************************************************************
            Control para que siga cuando no encuentra otra pagina
    **************************************************************/ 
    }catch(e){
        // console.log("LISTADO", links)


        // links.sort(function(a, b){ return b.horas-a.horas })

        var html = "<ul>";
        for (i in links) {
            if(links[i].horas >= 40 ) {
                html = html + "<li style='color:red'>( "+links[i].horas+" ) - "+links[i].inicio+" - <a href=\'"+links[i].enlace+"\' >"+links[i].titulo+"</a></li>" ;
            }
            else {
                html = html + "<li>( "+links[i].horas+" ) - "+links[i].inicio+" - <a href=\'"+links[i].enlace+"\' >"+links[i].titulo+"</a></li>" ;
            }
        }          
        html = html + "</ul>"; 

        sendEmail(html)

        console.error(e);
        yield nightmare.end(); 
    }

} 


/////////////////////////////////////////////////////////////////////////////////////////////////
//                      funciones
/////////////////////////////////////////////////////////////////////////////////////////////////



    /**************************************************************
            save  to local file
    **************************************************************/
    function saveToLocalFile(name, content) {
        var stream = fs.createWriteStream(name);
        stream.once('open', function(fd) {
            stream.write(content);
        stream.end();
        }); 
    }

    /**************************************************************
            prepare email  HORAS - INICIO - TITULO
            <-  JSON OF CURSOS
            ->  HTML con horas fecha inicio y titulo
    **************************************************************/
    function formatEmail(cursos){

        // console.log( "CURSOS: " +  JSON.stringify(cursos, null, 2)   );

        var html = "<ul>";
        Object.entries(cursos).forEach(([key, value]) => {
            // console.log(key, value);
            // html.concat("<h1>"+value.titulo+"</h1>") ;
            if(value.horas >= 40 ) {
                html = html + "<li style='color:red'>( "+value.horas+" ) - "+value.inicio+" - "+value.titulo+"</li>" ;
            }
            else {
                html = html + "<li>( "+value.horas+" ) - "+value.inicio+" - "+value.titulo+"</li>" ;
            }
            // console.log(key + ' ' + value.titulo); // "a 5", "b 7", "c 9"     
        });     
        html = html + "</ul>";      

        return html;
    }



    ///////////////////////////////////////////////////////////
    //          EMAIL NODEMAILER SERVICE
    ///////////////////////////////////////////////////////////

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'YOUR_EMAIL', pass: 'YOUR_PASS' }
    });

    /**************************************************************
            envia email mediante el modulo nodemailer de nodejs
            <-  html para enviar
            ->  envia email
    **************************************************************/

    function sendEmail(cursos) {

        var mailOptions = {
          from: 'YOUR_EMAIL',
          to: 'YOUR_EMAIL',
          subject: 'CURSOS CEFIRE',
          html: cursos
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

    }

    /**************************************************************
            read  local file
    **************************************************************/
    function comparaListados(name, cursos) {

            var readStream = fs.createReadStream(name);

            var data = '';
            var chunk;
            var cefireFile;

            readStream.on('readable', function() {
                while ((chunk=readStream.read()) != null) {
                    data += chunk;
                }
            });
            readStream.on('end', function() {
                console.log(data.length)
                console.log(cursos.length)
                // console.log(cursos)
                var diff = JsDiff.diffChars(data, cursos)
                data =  diff[0].value;
                
                // si diff es mayor de 1 es pq hay diferencias entre los listado
                if(diff.length>1) {

                    /* save json cursos to file */
                    saveToLocalFile(name, formatEmail(cursos));

                    /* send html formated email  */
                    listado.sort(function(a, b){ return Date.parse(b.inicio) - Date.parse(a.inicio); })                 
                    sendEmail(formatEmail(cursos));

                    console.log("DENTRO", diff);    
                }
            });
            // return   data;
    }

    ///////////////////////////////////////////////////////////
    //          sort json object by one  of its fields 
    ///////////////////////////////////////////////////////////
        // SORT
        // cursos.sort(function(a, b){
        //     return b.inicio>a.inicio
        // })


```