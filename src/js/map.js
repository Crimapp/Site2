// Default location
var initialLocation = {
    lat: -21.428673,
    lng: -45.949417
};

// Change current position of user and map view
function changeLocation(position){
    initialLocation.lat = position.coords.latitude;
    initialLocation.lng = position.coords.longitude;
    map.setCenter(initialLocation);
}

// Store the map
var map;

// Store the markers
var markers;

// Locations for tests on map
var locations = [
        {lat: initialLocation.lat - 0.0002, lng: initialLocation.lng - 0.0002},
        {lat: initialLocation.lat - 0.0001, lng: initialLocation.lng - 0.0001},
        {lat: initialLocation.lat - 0.0003, lng: initialLocation.lng + 0.0002},
        {lat: initialLocation.lat + 0.0002, lng: initialLocation.lng - 0.0005},
        {lat: initialLocation.lat - 0.0005, lng: initialLocation.lng - 0.0004},
        {lat: initialLocation.lat + 0.0001, lng: initialLocation.lng - 0.0002},
        {lat: initialLocation.lat + 0.0003, lng: initialLocation.lng - 0.0008},
        {lat: initialLocation.lat - 0.0001, lng: initialLocation.lng + 0.0004},
        {lat: initialLocation.lat + 0.0005, lng: initialLocation.lng - 0.0001},
        {lat: initialLocation.lat - 0.0002, lng: initialLocation.lng + 0.0008},
        {lat: initialLocation.lat + 0.0006, lng: initialLocation.lng - 0.0009},
        {lat: initialLocation.lat - 0.0009, lng: initialLocation.lng + 0.0004},
        {lat: initialLocation.lat - 0.009, lng: initialLocation.lng + 0.004}
      ]

function addControl(nome, radi, func, icon, title) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = radi;
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.margin = '10px';
    controlUI.style.textAlign = 'center';
    controlUI.title = title;
    nome.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.style.paddingTop = '10px';
    controlText.style.paddingBottom = '6px';
    controlText.innerHTML = icon;
    controlUI.appendChild(controlText);

    // Setup the click event listeners
    controlUI.addEventListener('click', func);
}

function changeBtn(pos, div){
    // remove botao atual
    map.controls[google.maps.ControlPosition.TOP_RIGHT].removeAt(pos);

    // adiciona novo botao
    map.controls[google.maps.ControlPosition.TOP_RIGHT].insertAt(pos,div);
}

// Get the index of marker on array of makers
function getMarkerPos(id){
    var i;
    if(id){
        for(i=0; i < markers.length; i++){
            if(markers[i].id == id){
                return i;
            }
        }
    }
    return -1;
}

// Get the id for a new marker
function newId(){
    var last = markers.length - 1;
    return markers[last].id + 1;
}

function initMap() {
    // Create the map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: initialLocation,
        gestureHandling: 'greedy',
        disableDefaultUI: true,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
            },
            {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
            },
            {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
            },
            {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
            },
            {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
            },
            {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
            },
            {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
            },
            {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
            },
            {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
            }
        ]
    });

    // Listener para evento de click durante adição de marcador
    var listenerClick;

    // Cria o botao que centraliza o mapa
    var addDiv = document.createElement('div');

    var addBtnControl = new addControl(addDiv, '100%',
        function(){
            // remove botao de adição
            changeBtn(0,deleteDiv);
            listenerClick = google.maps.event.addListener(map, 'click', function(event) {

                /* ---- checa com o backend se é permitido adicionar marcador -----
                 * se sim, executa rotinas abaixo,
                 * se não, exibe mensagem de erro e fecha modo de adição
                 * ----------------------------------------------------------------
                 */
                var eventoAdd = event;
                var titulo = document.getElementById("d-title");
                titulo.innerHTML = "Adicionar novo";
                    
                dialog.showModal();

                // When dialog close
                dialog.addEventListener('close', function aud(evt) {
                    if (dialog.returnValue == 'yes') {
                        var userMessage; // Store the message for user interface on add / update / delete point
                        var desc = document.getElementById("desc").value; // Get description of form
                        var tipo = document.querySelector('input[name="tipo"]:checked').value; // get the selected value
                        
                        if(titulo.innerHTML == "Adicionar novo"){
                            // If action is add new point
                            
                            /**
                             * Pegar todos os dados do formulario,
                             * montar requisição para o servidor,
                             * aguardar resposta.
                             */
                            var response = true; // Checar com backend se usuario esta ok
                            if(response){
                                // adiciona marcador ao mapa
                                var marker = new google.maps.Marker({
                                    position: eventoAdd.latLng,
                                    map: map,
                                    title: tipo,
                                    descricao: desc,
                                    id: newId()
                                });
                                
                                markers.push(marker); // Add new marker to array of markers

                                marker.addListener('click', function() {
                                    // Insert data from marker on form
                                    document.getElementById("d-title").innerHTML = "Atualizar";
                                    document.getElementById("desc").value = this.descricao;
                                    document.querySelector('input[value="'+ this.title +'"]').checked = true;
                                    dialog.id = this.id;
                                    dialog.showModal();
                                    dialog.addEventListener('close', aud);
                                });
                                
                                markerCluster.addMarker(marker);
                                userMessage = {message: 'Ponto adicionado com sucesso!'};
                            }
                            else{
                                userMessage = {message: 'Erro ao adicionar ponto.'};
                            }
                        }
                        else{
                            // If action is update a point
                            /**
                             * Pegar os dados do formulario,
                             * montar requisição para o servidor,
                             * aguardar resposta.
                             */
                            var response = true; // Checar com backend se usuario esta ok
                            if(response){
                                var m = markers[getMarkerPos(dialog.id)]; // Get the marker to be updated
                                // Update the marker
                                m.title = tipo;
                                m.descricao = desc;

                                userMessage = {message: 'Ponto atualizado com sucesso!'};
                            }
                            else{
                                userMessage = {message: 'Erro ao atualizar dados.'};
                            }
                        }
                        snackbarContainer.MaterialSnackbar.showSnackbar(userMessage);
                    }
                    else{
                        if (dialog.returnValue == 'del') {
                            // If action is delete a point
                            /**
                             * Pegar os dados do marcador,
                             * montar requisição para o servidor,
                             * aguardar resposta.
                             */
                            var response = true; // Checar com backend se usuario esta ok
                            if(response){
                                var index = getMarkerPos(dialog.id); // Get the marker to be updated
                                
                                //console.log(dialog.id);
                                if (index > -1) {
                                    markers[index].setMap(null);
                                    markerCluster.removeMarker(markers[index]);
                                    markers.splice(index, 1);
                                    userMessage = {message: 'Ponto removido com sucesso!'};
                                }
                                else{
                                    userMessage = {message: 'Erro ao remover ponto.'};
                                }                                
                            }
                            else{
                                userMessage = {message: 'Erro ao remover ponto.'};
                            }
                            snackbarContainer.MaterialSnackbar.showSnackbar(userMessage);
                        }
                        
                    }
                    
                    dialog.removeEventListener("close", aud); 
                    // descobre um jeito de voltar pro texto padrao ai vacilao
                    document.getElementById("desc").value = "";
                    document.querySelector('input[value="Roubo"]').checked = true;
                });

                // fecha modo de edição
                changeBtn(0,addDiv);
                listenerClick.remove();
                var snackbarContainer = document.querySelector('#message');
            });
            
        },
        '<i class="material-icons">add</i>',
        'Adicionar ponto'
    );
    
    // cria nova div
    var deleteDiv = document.createElement('div');
    var closeControl = new addControl(deleteDiv, '100%',
    function(){
        // Remove botao fechar
        changeBtn(0,addDiv);
        listenerClick.remove();
    },
    '<i class="material-icons">close</i>',
    'Parar adição de ponto'
    );

    // Cria o botao que centraliza o mapa
    var centerDiv = document.createElement('div');
    var centerControl = new addControl(centerDiv, '100%', function(){
        map.setCenter(initialLocation);},
        '<i class="material-icons">filter_center_focus</i>',
        'Centralizar mapa'
    );

    // Cria o botao que reseta zoom do mapa
    var zoomDiv = document.createElement('div');
    var zoomControl = new addControl(zoomDiv, '100%', function(){
        map.setZoom(15);},
        '<i class="material-icons">zoom_out_map</i>',
        'Resetar zoom'
    );

    // botoes de controle de zoom
    var zoomControlDiv = document.createElement('div');
    var zoomIn = new addControl(zoomControlDiv, '5px', function(){
        map.setZoom( map.getZoom() + 1 );},
        '<i class="material-icons">zoom_in</i>',
        'Almentar zoom'
    );
    var zoomOut = new addControl(zoomControlDiv, '5px', function(){
        map.setZoom( map.getZoom() - 1 );},
        '<i class="material-icons">zoom_out</i>',
        'Diminuir zoom'
    );

    // Adiciona botões ao mapa
    deleteDiv.index = 1;
    addDiv.index = 1;
    centerDiv.index = 2;
    zoomDiv.index = 3;
    zoomControlDiv.index = 4;

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addDiv);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerDiv);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomDiv);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);

    //  ------- aqui recebe o json do backend ---------

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            id: i
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
}