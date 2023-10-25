<script setup lang="ts">
</script>

<template>
    <div class="tiki-card-home">
        <div>
            <p>Month
                <span class="tiki-span-accent">
                    $4.80 / $12.00
                </span>
            </p>
            <p>
                Lifetime
                <span >
                    $34.30
                </span>
            </p>
            <button class="tiki-accent-text-button" @click="$emit('details')">
                Show More
            </button>
        </div>
        <div class="tiki-home-progress-bar">
            <progress value="75" min="0" max="100" style="visibility:hidden;height:0;width:0;">75%</progress>
        </div>
    </div>
</template>

<style scoped>
.tiki-card-home{
    width: 100%;
    background-color: var(--tiki-primary-background-color);
    box-sizing: border-box;
    border-radius: 0.625em;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 5%);
    border: 1px solid var(--tiki-secondary-text-color);
    display: flex;
    align-items: center;
    font-size: 1.1em;
    font-weight: 600;
    margin-top: 3em;
    margin-bottom: 2.3em;
    padding: 1.5em 0;
    justify-content: space-around;
    color: var(--tiki-secondary-text-color);
}
span{
    display: block;
    font-weight: 500;
    margin-top: 0.2em;
    font-size: 1.125em;
}
.tiki-span-accent{
    color: var(--tiki-success-color);
    font-weight: 600;
}

.tiki-accent-text-button{
    border: none;
    background: transparent;
    color: var(--tiki-success-color);
    font-size: 1.125em;
    font-weight: 500;
    margin-left: -0.4em
}

.tiki-home-progress-bar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: 
        radial-gradient(closest-side, white 79%, transparent 80% 100%), 
        conic-gradient(var(--tiki-success-color) 75%, white); 
}
</style>