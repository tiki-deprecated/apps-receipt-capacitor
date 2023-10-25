<script setup lang="ts">
</script>

<template>
    <div class="tiki-card-details">
        <div class="tiki-card-text">
            <p class="tiki-accent-text">Largest Contributors</p>
            <p>Walmart: 40%</p>
            <p>Kroger: 30%</p>
            <p>Dollar General: 20%</p>
        </div>
        <div class="tiki-details-progress-bar">
            <progress value="75" min="0" max="100" style="visibility:hidden;height:0;width:0;">75%</progress>
        </div>
    </div>
</template>

<style scoped>
.tiki-card-details{
    background-color: var(--tiki-primary-background-color);
    box-sizing: border-box;
    border-radius: 0.625em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
    border: 1px solid var(--tiki-secondary-text-color);
    display: flex;
    align-items: center;
    font-weight: 500;
    margin-top: 1em;
    padding: 1.8em 0;
    justify-content: space-around;
}
.tiki-card-text{
    color: var(--tiki-secondary-text-color);
    font-weight: 500;
}

.tiki-accent-text{
    color: var(--tiki-success-color);
    font-weight: 500;
}

.tiki-card-text p {
    margin: 0em
}
.tiki-details-progress-bar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: 
        radial-gradient(closest-side, white 79%, transparent 80% 100%), 
        conic-gradient(var(--tiki-success-color) 75%, white); 
}
</style>