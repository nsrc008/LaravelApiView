<template>
  <div class="card_product">
    <div class="card_product__img"><img class="img_product" :src="image" /></div>
    <div class="card_product__subtitle">{{ price }} $</div>
    <div class="card_product__wrapper">
      <div class="card_product__title">{{ product }}</div>
      <a  @click="selectItem({id})" class="card_product__icon">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z">
          </path>
          <path
            d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z">
          </path>
          <path
            d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z">
          </path>
          <path
            d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z">

          </path>
        </svg>
      </a>

    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {
      newItem: '',
    };
  },
  props: {
    image: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    product: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('itemSelected', item); // Emitir el evento al componente padre
    },
  },
}
</script>

<style>
.img_product {
  width: 150px;
  height: 100px;
}

.card_product {
  --main-color: #333333;
  --sub-color: #FF6347;
  --bg-color: #F0F3F4;
  --accent-color: #BC8D66;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 270px;
  padding: 25px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: var(--bg-color);
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 0px 0px 5px -1.5px #000;
  height: 250px;
  width: 200px;
}

.card_product::before {
  content: '';
  width: 99%;
  height: 99%;
  background: var(--sub-color);
  position: absolute;
  z-index: -1;
  top: 1px;
  left: 1px;
  border-radius: 25px;
  transition: all 0.3s;
}

.card_product__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card_product__img {
  width: 100%;
  align-items: center;
  text-align: center;
}

.card_product__title {
  color: var(--main-color);
  font-weight: 900;
  font-size: 25px;
}

.card_product__subtitle {
  color: var(--sub-color);
  font-weight: 600;
  font-size: 20px;
}

.card_product__icon {
  width: 40px;
  height: 40px;
  transform: rotate(-45deg);
  transition: all 0.3s;
}

.card_product__icon svg {
  width: 100%;
  height: 100%;
}

.card_product__icon g {
  fill: var(--main-color);
}

.card_product__icon circle,
polyline,
line {
  stroke: var(--main-color);
}

.card_product:hover .card_product__icon {
  transform: rotate(0);
}

.card_product:hover .card_product__icon circle,
.card_product:hover .card_product__icon polyline,
.card_product:hover .card_product__icon line {
  stroke: var(--accent-color);
}

.card_product:hover .card_product__icon g {
  fill: var(--accent-color);
}

.card_product:hover {
  box-shadow: 0px 0px 20px -5px #000;
}

.card_product:hover::before {
  transform: rotate(10deg);
  box-shadow: 0px 0px 20px -5px #000;
}

/* remove svg from class ="card_product__img" and last styles below css code before use */
.st1 {
  fill: #fff
}

.st2 {
  fill: none;
  stroke: #242c88;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10
}

.st7 {
  fill: #589fff
}

.st9 {
  fill: #bc8d66
}

.st15,
.st16 {
  opacity: .4;
  fill: #242c88
}

.st16 {
  opacity: .2
}

.st18 {
  fill: #ffc408
}

.st53 {
  fill: none;
  stroke: #242c88;
  stroke-width: 1.848;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10
}</style>