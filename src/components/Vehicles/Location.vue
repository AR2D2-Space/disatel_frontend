<template>
    <div>
        <p v-text="message"></p>
        <div id="map"></div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Location',
    data() {
        return {
            message: '',
            dots: [],
            rute: [],
            polyline: '',
            lat: '',
            long: '',
            velocity: '', 
            firstTime: true,
            mymap: '',
            marker: ''
        }
    }, 
    methods: {
        renderMap() {
            if ( this.firstTime ) {
                this.mymap = L.map('map').setView([this.lat, this.long], 5);
                const myIcon = L.icon({
                    iconUrl: 'static/img/map-pin-80.png',
                    iconSize: [20, 16],
                    iconAnchor: [14, 30],
                //     // popupAnchor: [-3, -76],
                //     // // shadowUrl: 'my-icon-shadow.png',
                //     // shadowSize: [68, 95],
                //     // shadowAnchor: [22, 94]
                });
                this.marker = L.marker([15.7834711, -90.2307587], {icon: myIcon}).addTo(this.mymap);
                this.marker.setLatLng([this.lat, this.long]);
                this.polyline = L.polyline(this.rute, {color: 'red'}).addTo(this.mymap);
                this.mymap.fitBounds(this.polyline.getBounds());
                const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                const attribution = ''
                const tile = L.tileLayer(
                    tileUrl, {
                    attribution,
                }).addTo(this.mymap);
                this.firstTime = false;
            } else {
                this.mymap.setView([this.lat, this.long], 4);
                this.polyline = L.polyline(this.rute, {color: 'red'}).addTo(this.mymap);
                this.mymap.fitBounds(this.polyline.getBounds());
            }
        },
        geo() {
            this.message = 'Te voy a encontrar...';
            const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';
            const instance = this;
            async function getIss() {
                const response = await axios.get(apiUrl);
                const data = response.data;
                instance.dots = [data.latitude, data.longitude]
                instance.rute.push(instance.dots);
                instance.lat = data.latitude;
                instance.long = data.longitude;
                instance.message = `Te encontramos en: ${instance.lat}, ${instance.long}`;
                instance.velocity = data.velocity;
                instance.renderMap()
            }
            setInterval(getIss, 2000);
        }
    },
    created() {
        this.geo();
    },
}
</script>

<style scoped>
#map {
    position: initial;
    height: 400px;
    width: 1000px;
    margin: 0 auto;
}
</style>