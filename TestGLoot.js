Vue.component('list-player-component',{
    props: {
        player:{
            type:Object
        },
        players:{
            type:Array
        },
        index:{
            type:Number
        }
    },
    data: function() {
        return {
            isEditable : null
        }
    },
    methods:{
        deletePlayer(id){
            fetch("http://localhost:3000/player/"+id,{
                method:"DELETE"
            })
            .then(() => {
                this.players.splice(this.index,1);
            })
        },
        updatePlayer(player){
            fetch("http://localhost:3000/player/"+player.id,{
                body:JSON.stringify(player),
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                }
            })
            .then(() => {
                this.isEditable=null;
            })
        }
    },
    template:`
    <div class="row justify-content-md-center border">
        <div class="row justify-content-md-center" v-if="isEditable === player.id">
        <div class="col-12"><input v-model="player.name" v-on:keyup.13="updatePlayer(player)" autofocus/></td></div>
        </div>
        <div class="row justify-content-md-center" v-else>
        <div class="col-8">{{player.name}}</div>
        <div class="col-2"><button v-on:click="isEditable = player.id" class="btn btn-primary btn-xs">Edit</button></div>
        <div class="col-2"><button v-on:click="deletePlayer(player.id)" class="btn btn-danger btn-xs">Delete</button></div>
        </div>
    </div>
    
    `
});

Vue.component('add-player-component',{
    props: {
        players:{
            type:Array
        }
    },
    data :function(){
        return{
            playerName:"",
        }
    },
    methods:{
        addPlayer(playerName){
            var player = {name: playerName };
            fetch("http://localhost:3000/player/",{
                body:JSON.stringify(player),
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                }
            }).then(async response => {
                const responseData = await response.json();
                this.players.push({"id":responseData.id,"name":responseData.name});
                this.playerName="";
            });
            
        },
    },
    template:`
    <div class="row justify-content-md-center">
        <div class="col-8"><input v-model="playerName" v-on:keyup.13="addPlayer(playerName,players)" class="form-control"/></div>
        <div class="col-4"><button v-on:click="addPlayer(playerName)" class="btn btn-success btn-xs px-4 me-sm-3">Add New</button></div>
    </div>
    `
});

const app = new Vue({
    el: "#app",
    data: {
        players:[],
        newPlayerName:""
    },
    mounted(){
        fetch("http://localhost:3000/players").then(async response => await response.json()).then((data) => {
            this.players = data;
        })
    },
    template: `
    <div>
    <h1 class="display-5 fw-bold px-4 py-5 my-5 text-center">Player List</h1>
    <list-player-component v-for="item,i in players" :player="item" :players="players" :index="i" />
    <br />
    <add-player-component :players="players" />
    </div>
    `
});