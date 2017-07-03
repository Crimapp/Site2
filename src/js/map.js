// Localização inicial
var alfenas = {
    lat: -21.428673,
    lng: -45.949417
};

// Armazena o mapa
var map;

// Usado para testes no mapa
var locations = [
        {lat: alfenas.lat - 0.0002, lng: alfenas.lng - 0.0002},
        {lat: alfenas.lat - 0.0001, lng: alfenas.lng - 0.0001},
        {lat: alfenas.lat - 0.0003, lng: alfenas.lng + 0.0002},
        {lat: alfenas.lat + 0.0002, lng: alfenas.lng - 0.0005},
        {lat: alfenas.lat - 0.0005, lng: alfenas.lng - 0.0004},
        {lat: alfenas.lat + 0.0001, lng: alfenas.lng - 0.0002},
        {lat: alfenas.lat + 0.0003, lng: alfenas.lng - 0.0008},
        {lat: alfenas.lat - 0.0001, lng: alfenas.lng + 0.0004},
        {lat: alfenas.lat + 0.0005, lng: alfenas.lng - 0.0001},
        {lat: alfenas.lat - 0.0002, lng: alfenas.lng + 0.0008},
        {lat: alfenas.lat + 0.0006, lng: alfenas.lng - 0.0009},
        {lat: alfenas.lat - 0.0009, lng: alfenas.lng + 0.0004},
        {lat: alfenas.lat - 0.009, lng: alfenas.lng + 0.004}
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

function addMarker(pos){
    var marker = new google.maps.Marker({
        position: pos,
        map: map
    });

    return marker;
}

function changeBtn(pos, div){
    // remove botao atual
    map.controls[google.maps.ControlPosition.TOP_RIGHT].removeAt(pos);

    // adiciona novo botao
    map.controls[google.maps.ControlPosition.TOP_RIGHT].insertAt(pos,div);
}

function initMap() {
    // Cria o mapa
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: alfenas,
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
                marker = new google.maps.Marker({position: event.latLng, map: map});
                markerCluster.addMarker(marker);

                // fecha modo de edição
                changeBtn(0,addDiv);
                listenerClick.remove();
                var snackbarContainer = document.querySelector('#message');
                var data = {message: 'Ponto adicionado com sucesso!'};
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
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
        map.setCenter(alfenas);},
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
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
    //var marker = addMarker(alfenas);
}