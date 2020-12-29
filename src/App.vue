<template>
  <div id="app">
    <h1>VMCS Contest Standings</h1>
    <div class="container">
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
export default {
  name: 'App',
  beforeMount() {
    axios.get("https://b2cdn.vmcs.club/file/vmcs-assets/contests/data.json").then((response) => {
      console.log(response);
      this.standings = response.data;
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

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
