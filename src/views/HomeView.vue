<script setup>
</script>

<template>
  <div class="container text-center ps-0 pe-0">
    <div class="row">
      <div class="col-10 offset-1 mt-3">
        <div class="alert alert-primary" role="alert">
          <h3>Bievenidos a Decameron</h3>
        </div>
      </div>
      <div>
        <router-link to="/createHotel"
          ><button type="button" class="btn btn-info marginDiv">
            Nuevo Hotel
          </button></router-link
        >
      </div>
      <div class="col-10 offset-1">
        <table class="table table-bordered border-secondary" :data="rows">
          <thead>
            <tr>
              <th scope="col" class="txt">Nombre del Hotel</th>
              <th scope="col" class="txt">Ciudad</th>
              <th scope="col" class="txt">Detalles</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="index">
              <td>{{ row.name }}</td>
              <td>{{ row.city }}</td>
              <td>
                <button
                  class="btn btn-outline-info"
                  type="button"
                  href=""
                  @click="hotelById(row.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { HttpServices } from "../modules/hotels/service/hotel.service";
export default {
  data() {
    return {
      rows: [],
      hotelId: [],
    };
  },
  mounted() {
    this.get_hotels();
  },
  methods: {
    async get_hotels() {
      try {
        this.rows = await HttpServices.getHotels();
      } catch (error) {
        alert(error);
      }
    },
    async hotelById(id) {
      try {
        this.hotelId = await HttpServices.getHotelById(id);
        localStorage.setItem("hotel", JSON.stringify(this.hotelId));
        this.$router.push("/detailHotel");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>