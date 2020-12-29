<template>
  <div id="app">
    <h1 class="text-center mt-5 ">VMCS Contest Standings</h1>
    <p class="text-center">Last modified: <strong>{{lastModified}}</strong></p>
    <div class="container mt-5">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>
              ID
            </th>
            <th>
              Name
            </th>
            <th>
              Points
            </th>
            <th>
              Details
            </th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="standing in standingsSorted" v-bind:key="standing.id">
          <td>
            {{standing["id"]}}
          </td>
          <td>
            {{standing["name"]}}
          </td>
          <td>
            {{standing["points"]}}
          </td>
          <td>
            <b-button @click="showDetails(standing.id)" variant="primary">Details</b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <b-modal id="modal-details" hide-footer>
      <template #modal-title>
        Details for team {{selected}}
      </template>
      <div class="d-block text-center" v-if="selected !== -1">
        <b-list-group>
          <b-list-group-item v-for="(note, i) in standings[selected].history" v-bind:key="i">
            <strong>{{note.amount >= 0 ? "+" : ""}}{{note.amount}}</strong> - {{note.notes}}
          </b-list-group-item>
        </b-list-group>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('modal-details')">Close</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'App',
  beforeMount() {
    axios.get("https://b2cdn.vmcs.club/file/vmcs-assets/contests/data.json").then((response) => {
      console.log(response);
      this.standings = response.data.data;
      this.lastModified = moment(response.data.lastModified*1000).format("LLLL");
    })
  },
  computed: {
    standingsSorted () {
      let standingsSorted = [];
      for(const teamID of Object.keys(this.standings)){
        standingsSorted.push(this.standings[teamID]);
        standingsSorted[standingsSorted.length-1]["id"] = teamID;
      }
      standingsSorted.sort(function(a, b){
        return b["points"] - a["points"];
      })
      return standingsSorted;
    },
  },
  data() {
    return {
      standings: {},
      lastModified: 0,
      selected: -1
    }
  },
  methods: {
    showDetails(id){
      console.log(id);
      this.selected = id;
      this.$bvModal.show('modal-details');
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
html {
  color: #212529;
}

body {
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
}

p {
  font-family: 'IBM Plex Sans', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: bold;
}

p, a, h1, h2, h3, h4, h5, h6 {
  transition: color 150ms ease-in;
}

a {
  color: #212529;
}

a:hover {
  text-decoration: none;
  color: #6d7079;
}
</style>
