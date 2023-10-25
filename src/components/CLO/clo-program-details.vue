<script setup lang="ts">
import {
  IconAccount,
  IconBag,
  IconForbidden,
  IconGraphic,
  IconGrayAlert,
  IconHand,
  IconInfo,
  IconMoney,
  IconPurchase,
  IconReceipt,
} from "@/assets/icons";
</script>

<template>
  <div class="tiki-program-details">
    <div class="tiki-what-data">
      <icon-account />
      <h2>What data do we collect?</h2>
      <p class="tiki-program-details-subtitle">
        Learn about how your data powers your cashback connections
      </p>
      <div class="tiki-cashback-container">
        <div class="tiki-data-usage">
          <icon-bag />
          <span>Purchases</span>
        </div>
        <div class="tiki-data-usage">
          <icon-receipt />
          <span>Receipts</span>
        </div>
        <div class="tiki-data-usage">
          <icon-info />
          <span>User ID</span>
        </div>
      </div>
    </div>

    <div class="tiki-data-usage-container">
      <h2>How is that data used?</h2>
      <div>
        <icon-money />
        <span>Find Cashback rewards</span>
      </div>
      <div>
        <icon-purchase />
        <span>Relevant ads and offers</span>
      </div>
      <div>
        <icon-graphic />
        <span>Create shopper insights</span>
      </div>
    </div>
    <div class="tiki-actions-container">
      <div class="tiki-action">
        Report an Issue
        <icon-gray-alert />
      </div>
      <div class="tiki-action">
        Data licensing agreement
        <icon-hand />
      </div>
      <div class="tiki-action tiki-action-alert">
        Opt out of cashback connections
        <icon-forbidden />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tiki-program-details {
  text-align: center;
  color: var(--tiki-secondary-text-color);
  background-color: var(--tiki-primary-background-color);
  box-sizing: border-box;
  border-radius: 0.625em;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
  border: 1px solid var(--tiki-secondary-text-color);
  align-items: center;
  font-weight: 500;
  margin-bottom: 1.2em;
  margin-top: 1em;
  padding: 1.8em 0 0 0;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0.2em;
}

span {
    margin-left: 0.8em
}

.tiki-cashback-container {
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  margin: 1em auto;
}

.tiki-data-usage {
  width: 50%;
  display: flex;
  padding: 0.5em 0 0 0;
}

.tiki-program-details-subtitle {
  margin: 0;
  font-weight: 500;
}

.tiki-data-usage-container {
  margin: 2em;
}

.tiki-data-usage-container h2 {
    margin-bottom: 1.2em;
}
.tiki-data-usage-container div {
  margin: 0.8em 0;
}

.tiki-actions-container {
  border-top: 1px solid var(--tiki-secondary-text-color);
  width: 100%;
}

.tiki-action {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--tiki-secondary-text-color);
  padding: 1em;
}
.tiki-action-alert {
  color: var(--tiki-error-color);
  border: none;
}
</style>
