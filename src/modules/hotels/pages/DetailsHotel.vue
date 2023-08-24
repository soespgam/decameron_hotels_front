<template>
  <div class="row">
    <div class="col-10 offset-1 mt-3">
      <div class="alert alert-primary text-center" role="alert">
        <h3>Hotel {{ dataHotel.name }}</h3>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-10 offset-1">
      <div class="row">
        <div class="col-6">
          <div>
            <label class="col-sm-2 col-form-label"
              ><strong>Nombre</strong></label
            >
            <label class="form-control">{{ dataHotel.name }}</label>
          </div>
          <div>
            <label class="col-sm-2 col-form-label"
              ><strong>Ciudad</strong></label
            >
            <label class="form-control">{{ dataHotel.city }}</label>
          </div>
          <div>
            <label class="col-sm-3 col-form-label"
              ><strong>N° Habitaciones</strong></label
            >
            <label class="form-control">{{ dataHotel.capacity }}</label>
          </div>
        </div>
        <div class="col-6">
          <div>
            <label class="col-sm-2 col-form-label"
              ><strong>Direccion</strong></label
            >
            <label class="form-control">{{ dataHotel.address }}</label>
          </div>
          <div>
            <label class="col-sm-2 col-form-label"><strong>Nit</strong></label>
            <label class="form-control">{{ dataHotel.nit }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-10 offset-1 mt-3">
      <table class="table table-bordered border-secondary">
        <thead>
          <tr>
            <th scope="col"><strong>Cantidad</strong></th>
            <th scope="col"><strong>Tipo Habitacion</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ dataHotel.estandar }}</td>
            <td>ESTANDAR</td>
          </tr>
          <tr>
            <td>{{ dataHotel.junior }}</td>
            <td>JUNIOR</td>
          </tr>
          <tr>
            <td>{{ dataHotel.suite }}</td>
            <td>ESTANDAR</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-10 offset-1 marginDiv">
      <button
        type="button"
        class="btn btn-info"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Asignar Habitacion
      </button>
    </div>
    <div class="col-10 offset-1 marginDiv">
      <h1 class="text-center">Asignaciones Activas</h1>
    </div>
    <div class="col-10 offset-1">
      <table class="table table-bordered border-secondary">
        <thead>
          <tr>
            <th scope="col"><strong>Cantidad</strong></th>
            <th scope="col"><strong>Tipo Habitación</strong></th>
            <th scope="col"><strong>Acomodación</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in assingHotel" :key="index">
            <td>{{ row.cantidad }}</td>
            <td>{{ row.type_room }}</td>
            <td>{{ row.type_accommodation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 marginDiv">
      <h1 class="text-center">Habitaciones Disponibles</h1>
      <table class="table table-bordered border-secondary">
        <thead>
          <tr>
            <th scope="col"><strong>Estandar</strong></th>
            <th scope="col"><strong>Junior</strong></th>
            <th scope="col"><strong>Suite </strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ this.dataHotel.ava_estandar }}</td>
            <td>{{ this.dataHotel.ava_junior }}</td>
            <td>{{ this.dataHotel.ava_suite }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1">
      <router-link to="/"
        ><button type="button" class="btn btn-info">Home</button></router-link
      >
    </div>
  </div>

  <!-- Modal -->
  <div class="row">
    <div class="col-12">
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-2">
                  <label>Cantidad</label>
                  <label class="form-control">1</label>
                </div>
                <div class="col-5">
                  <label>Tipo de Habitacion</label>
                  <select
                    v-model="selected_habitacion"
                    v-model.trim="data_assing.type_room"
                    v-on:change="validateTypeHab()"
                  >
                    <option disabled value="">
                      Seleccione el tipo de habitacion
                    </option>
                    <option
                      v-for="tiposHabitacion in tiposHabitacion"
                      :value="tiposHabitacion.name"
                      :key="tiposHabitacion.name"
                    >
                      {{ tiposHabitacion.name }}
                    </option>
                  </select>
                </div>
                <div class="col-5">
                  <label>Tipo de acomodacion</label>
                  <select
                    v-model="selected_acomodacion"
                    v-model.trim="data_assing.type_accommodation"
                  >
                    <option disabled value="">
                      Seleccione el tipo de acomodacion
                    </option>
                    <option
                      v-for="tiposAcomodacion in tiposAcomodacion"
                      :value="tiposAcomodacion.name"
                      :key="tiposAcomodacion.name"
                    >
                      {{ tiposAcomodacion.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click="create_new_assing()"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HttpServicesAssing } from "../../assign/service/assign.service";
import { HttpServices } from "../service/hotel.service";
export default {
  data() {
    return {
      rows: [],
      dataHotel: [],
      assingHotel: [],
      data_assing: {
        type_room: "",
        type_accommodation: "",
        fk_hotel: "",
      },
      selected_habitacion: "",
      selected_acomodacion: "",
      tiposHabitacion: [
        { name: "estandar" },
        { name: "junior" },
        { name: "suite" },
      ],
      tiposAcomodacion: [],
      capacityHotel: "",
    };
  },
  mounted() {
    this.get_hotel();
    this.get_assing_by_hotel();
  },
  methods: {
    async get_hotel() {
      try {
        this.dataHotel = JSON.parse(localStorage.getItem("hotel"));

        this.hotelId = await HttpServices.getHotelById(this.dataHotel.id);
        localStorage.setItem("hotel", JSON.stringify(this.hotelId));
        this.dataHotel = JSON.parse(localStorage.getItem("hotel"));
      } catch (error) {
        alert(error);
      }
    },
    validateTypeHab() {
      if (this.selected_habitacion == "estandar") {
        this.tiposAcomodacion = [{ name: "sencilla" }, { name: "doble" }];
      }
      if (this.selected_habitacion == "junior") {
        this.tiposAcomodacion = [{ name: "triple" }, { name: "cuadruple" }];
      }
      if (this.selected_habitacion == "suite") {
        this.tiposAcomodacion = [
          { name: "sencilla" },
          { name: "doble" },
          { name: "triple" },
        ];
      }
    },

    async create_new_assing() {
      this.capacityHotel =
        this.dataHotel.ava_estandar +
        this.dataHotel.ava_junior +
        this.dataHotel.ava_suite;
      if (this.capacityHotel == 0) {
        Swal.fire({
          icon: "warning",
          text: "el hotel esta en su maxima capacidad , intenta con otro hotel",
        });
      } else {
        if (
          this.data_assing.type_room == "estandar" &&
          this.dataHotel.ava_estandar == 0
        ) {
          Swal.fire({
            icon: "warning",
            text: "ya no tienes mas habitaciones tipo estandar libres",
          });
          return;
        }

        if (
          this.data_assing.type_room == "junior" &&
          this.dataHotel.ava_junior == 0
        ) {
          Swal.fire({
            icon: "warning",
            text: "ya no tienes mas habitaciones tipo junior libres",
          });
          return;
        }

        if (
          this.data_assing.type_room == "suite" &&
          this.dataHotel.ava_suite == 0
        ) {
          Swal.fire({
            icon: "warning",
            text: "ya no tienes mas habitaciones tipo suite libres",
          });
          return;
        }

        this.data_assing.fk_hotel = this.dataHotel.id;
        this.data_assing.type_room = this.selected_habitacion;
        try {
          const data = await HttpServicesAssing.createAssing(this.data_assing);
          console.log(data);
          Swal.fire({
            icon: 'success',
            text: 'Asignacion creada con Exito',
          })
          await this.get_assing_by_hotel();
          await this.get_hotel();

        } catch (error) {
          alert(error);
        }
      }
    },

    async get_assing_by_hotel() {
      try {
        this.assingHotel = await HttpServicesAssing.getAssingByHotel(
          this.dataHotel.id
        );
      } catch (error) {
        console.log("ASSIGN",error);
      }
    },
  },
};
</script>