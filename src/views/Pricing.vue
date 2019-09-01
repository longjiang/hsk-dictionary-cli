<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5">Pricing Chart</h1>
        <Sale class="mb-5 rounded" />
        <div class="bg-success text-light p-3 text-center mb-5 rounded">
          <h4 class="mb-0">No subscriptions! 😊 Pay once, enjoy forever!</h4>
        </div>
        <p class="mb-3">
          <b>These are <em>not</em> subscriptions.</b> You pay once and you will
          own it for life. No recurring fees.
        </p>
        <p>
          Currency:
          <select v-if="rates" name="" id="" v-model="currency" class="mb-3">
            <option
              v-for="(rate, symbol) in rates"
              :value="symbol"
              :selected="currency === symbol"
              >{{ symbol.replace('CNY', 'RMB') }}</option
            >
          </select>
        </p>

        <table class="table table-bordered" :key="key">
          <thead>
            <tr class="table-secondary">
              <th class="text-left">Course</th>
              <th class="text-center">Single</th>
              <th class="text-center">Bundle</th>
              <th class="text-center">Course Bundle</th>
            </tr>
          </thead>
          <tbody class="table-hover">
            <tr>
              <td
                class="text-left text-light"
                style="background-color:#F6B000;"
              >
                HSK 1
              </td>
              <td class="text-center">
                <span v-html="price(29, {sale: true})"></span>
              </td>
              <td class="text-center align-middle" rowspan="4">
                <span v-html="price(134, {sale: true})"></span><br /><span style="color:rgb(26,148,6); font-size:12px;"
                  >Save {{ money(24) }}</span
                >
              </td>
              <td class="text-center align-middle" rowspan="7">
                <span v-html="price(219, {sale: true})"></span> <br /><span
                  style="color:rgb(26,148,6); font-size:12px;"
                  >Save {{ money(67) }}</span
                >
              </td>
            </tr>

            <tr>
              <td
                class="text-left text-light"
                style="background-color:#2D7F97;"
              >
                HSK 2
              </td>
              <td class="text-center">
                <span v-html="price(29, {sale: true})"></span>
              </td>
            </tr>

            <tr>
              <td
                class="text-left text-light"
                style="background-color:#FF771E;"
              >
                HSK 3
              </td>
              <td class="text-center">
                <span v-html="price(36, {sale: true})"></span>
              </td>
            </tr>

            <tr>
              <td
                class="text-left text-light"
                style="background-color:#BB1B17;"
              >
                HSK 4
              </td>
              <td class="text-center">
                <span v-html="price(64, {sale: true})"></span>
              </td>
            </tr>

            <tr>
              <td
                class="text-left text-light"
                style="background-color:#1A386D;"
              >
                HSK 5 + Path to Fluency
              </td>
              <td class="text-center">
                <span v-html="price(64, {sale: true})"></span>
              </td>
              <td class="text-center align-middle" rowspan="3">
                <span v-html="price(109, {sale: true})"></span>
                <br /><span style="color:rgb(26,148,6); font-size:12px;"
                  >Save {{ money(48) }}</span
                >
              </td>
            </tr>
            <tr>
              <td
                class="text-left text-light"
                style="background-color:#6A3368;"
              >
                HSK 6 + Path to Fluency
              </td>
              <td class="text-center">
                <span v-html="price(64, {sale: true})"></span>
              </td>
            </tr>
            <tr>
              <td
                class="text-left text-light"
                style="background-color:#1c545a;"
              >
                Path To Fluency
              </td>
              <td class="text-center">
                <span v-html="price(29, {sale: true})"></span>
              </td>
            </tr>
            <tr>
              <td
                class="text-left text-light"
                style="background-color:rgba(58,68,118,0.76);"
              >
                Pronunciation
              </td>
              <td class="text-center" colspan="3"><b>FREE</b></td>
            </tr>
          </tbody>
        </table>
        <p>
          <b>VAT</b> applies to any merchant selling a product or service
          (including digital products like an online course) to a customer based
          in Europe. So if you're based in Europe, we are required to charge VAT
          on top of these prices.
        </p>

        <p>
          If you're enrolled in either HSK 5, 6, or the Ultimate Bundle, you'll
          <b>get the Path To Fluency course for free</b>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import fx from 'money'
import accounting from 'accounting'
import Sale from '@/components/Sale'

export default {
  components: {
    Sale
  },
  props: {
    args: {
      default: 'USD'
    }
  },
  data() {
    return {
      accounting,
      currency: this.args,
      key: 'USD',
      rates: undefined
    }
  },
  methods: {
    money(n) {
      if (this.rates) {
        return accounting
          .formatMoney(
            Math.round(fx.convert(n, { from: 'USD', to: this.currency })),
            { symbol: this.currency, format: '%v %s', precision: 0 }
          )
          .replace('CNY', 'RMB')
      } else {
        return n + ' USD'
      }
    },
    price(n, options) {
      if (options.sale === true) {
        return `<strike>${this.money(n)}</strike><br/><span class="sale-price">SALE: <b>${this.money(n * 0.75)}</b></span>`
      } else {
        return `<b>${this.money(n)}</b>`
      }

    }
  },
  watch: {
    args() {
      this.currency = this.args
    },
    currency() {
      location.hash = '#/pricing/' + this.currency
    }
  },
  created() {
    // Load exchange rates data via AJAX:
    $.getJSON(
      // NB: using Open Exchange Rates here, but you can use any source!
      'https://api.exchangeratesapi.io/latest',
      data => {
        // Check money.js has finished loading:
        this.rates = data.rates
        this.key = this.currency
        if (typeof fx !== 'undefined' && fx.rates) {
          fx.rates = data.rates
          fx.base = data.base
        }
      }
    )
  }
}
</script>

<style>
.sale-price {
  color: red;
}
</style>
