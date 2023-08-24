<template>
  <div class="container ps-0 pe-0">
    <div class="row">
      <div class="col-10 offset-1 mt-3">
        <div class="alert alert-primary text-center" role="alert">
          <h3>Crear Hotel</h3>
        </div>
      </div>
      <div class="col-8 offset-2 mt-3">
        <form>
          <div class="mb-3">
            <label class="form-label txt">Nombre </label>
            <input
              v-model.trim="hotel_save.name"
              type="text"
              class="form-control"
              id="name"
            />
          </div>

          <div class="mb-3">
            <label class="form-label txt">Ciudad</label>
            <input
              v-model.trim="hotel_save.city"
              type="text"
              class="form-control"
              id="city"
            />
          </div>

          <div class="mb-3">
            <label class="form-label txt">Direccion</label>
            <input
              v-model.trim="hotel_save.address"
              type="text"
              class="form-control"
              id="address"
            />
          </div>

          <div class="mb-3">
            <label class="form-label txt">Nit</label>
            <input
              v-model.trim="hotel_save.nit"
              type="text"
              class="form-control"
              id="nit"
            />
          </div>

          <div class="mb-3">
            <label class="form-label txt">Numero de Habitaciones</label>
            <input
              v-on:keyup="validateCapacity()"
              v-model.trim="hotel_save.capacity"
              type="number"
              class="form-control"
              id="capacidad"
            />
          </div>

          <div class="mb-3">
            <label class="form-label txt">Cantidad Habitaciones Estandar</label>
            <input
              v-model.trim="hotel_save.estandar"
              type="number"
              class="form-control"
              id="estandar"
            />
          </div>

          <div class="mb-3">
            <label class="form-label txt">Cantidad Habitaciones Junior</label>
            <input
              v-model.trim="hotel_save.junior"
              type="number"
              class="form-control"
              id="junior"
            />
          </div>

          <div class="mb-3">
            <label class="form-label txt">Cantidad Habitaciones Suite</label>
            <input
              v-model.trim="hotel_save.suite"
              type="number"
              class="form-control"
              id="suite"
            />
          </div>
        </form>
      </div>
      <div class="row">
        <div class="col-10 offset-1 mt-3">
          <div class="row">
            <div class="col-6">
              <div class="centerDiv">
                <button
                  type="button"
                  class="btn btn-info"
                  @click="create_hotel()"
                >
                  Guardar Hotel
                </button>
              </div>
            </div>
            <div class="col-6">
              <div class="centerDiv">
                <router-link to="/"
                  ><button type="button" class="btn btn-info">
                    Home
                  </button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HttpServices } from "../service/hotel.service";
export default {
  data() {
    return {
      rows: [],
      hotel_save: {
        name: "",
        city: "",
        address: "",
        capacity: "",
        nit: "",
        estandar: "",
        junior: "",
        suite: "",
        ava_estandar: "",
        ava_junior: "",
        ava_suite: "",
      },
      total_capacity: "",
    };
  },
  mounted() {},
  methods: {
    validateCapacity() {
      this.total_capacity =
        this.hotel_save.estandar +
        this.hotel_save.junior +
        this.hotel_save.suite;
    },

    async create_hotel() {
      if (!this.hotel_save.name) {
        Swal.fire("el nombre es obligatorio");
        return;
      }
      if (!this.hotel_save.city) {
        Swal.fire("la ciudad es obligatorio");
        return;
      }
      if (!this.hotel_save.address) {
        Swal.fire("falta la direccion");
        return;
      }
      if (!this.hotel_save.nit) {
        Swal.fire("falta el nit");
        return;
      }
      if (!this.hotel_save.capacity) {
        Swal.fire("es necesario ingresar la capacidad total del hotel");
        return;
      }
      if (!this.hotel_save.estandar) {
        Swal.fire("falta indicar cuantas habitaciones Estandar tiene el hotel");
        return;
      }
      if (!this.hotel_save.junior) {
        Swal.fire("falta indicar cuantas habitaciones Junior tiene el hotel");
        return;
      }
      if (!this.hotel_save.suite) {
        Swal.fire("falta indicar cuantas habitaciones suite tiene el hotel");
        return;
      }

      this.validateCapacity();
      if (this.total_capacity > this.hotel_save.capacity) {
        Swal.fire({
          icon: 'error',
          text: 'Estas excediendo el número de habitaciones',
        })
        return;
      }

      this.hotel_save.ava_estandar = this.hotel_save.estandar;
      this.hotel_save.ava_junior = this.hotel_save.junior;
      this.hotel_save.ava_suite = this.hotel_save.suite;

      try {
        const data = await HttpServices.createHotel(this.hotel_save);
        Swal.fire({
          icon: "success",
          text: "Hotel creado con Exito",
        });
        setTimeout(() => {
          this.$router.push("/");
        }, "2000");
      } catch (error) {
        Swal.fire({
          icon: "warning",
          text: "El hotel ya existe",
        });
      } 
    },
  },
};
</script>