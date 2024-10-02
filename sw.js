self.addEventListener('install', event=>{

    caches.open('appShell').then(cache=>{ 
        cache.addAll([      //agregar mas de una cache
            '/index.html',
            'partidos.html',
            '/imagenes/alemania.png',
            '/css/estilos.css',

        ])
    })


   /*  caches.match('/index.html')
    .then(respuesta=>{
        respuesta.text().then(console.log) // imprimir texto en consola
    }); */

    self.skipWaiting(); //activar el service worker 
    
});

self.addEventListener('activate', event=>{
    caches.delete('appShell13');

})


self.addEventListener('fetch', event=>{
    const resp = fetch(event.request).then(respuesta =>{

        if(!respuesta){
            return caches.match(event.request); //validar si el cache existe
        }else{
            
            caches.open('dinamico')
                .then(cache=>{
                    cache.put(event.request, respuesta);
                });
                return respuesta.clone();
            
        }
    }).catch(err =>{
        return caches.match(event.request);
    });

    event.respondWith(resp);
    
});
