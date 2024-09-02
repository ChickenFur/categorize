<script lang="ts">
    import {categorized} from '$lib/categorized'
    import type {Categorization} from '$lib/categorized'
    import {base64Images} from '$lib/base64Images'

    let categorizedValue: Categorization
    let base64ImagesValue: string[]
    
    categorized.subscribe(value => {
        categorizedValue = value
    })
    base64Images.subscribe(value => {
        base64ImagesValue = value
    })


</script>
<div>
    <h1>Results</h1>
    <div>
      {#if categorizedValue}
      <div>
        <h2>Classification: {categorizedValue.type}</h2>
        <p>Brand: {categorizedValue.brand}</p>
        <p>Size: {categorizedValue.size}</p>
        <p>Condition: {categorizedValue.condition}</p>
        <p>Detail Summary: {categorizedValue.detailSummary}</p>
        <p>Buy Price: {categorizedValue.buyPrice}</p>
        <p>Sell Price: {categorizedValue.sellPrice}</p>
      </div>
    {:else}
      <p>No results yet</p>
    {/if}
    </div>
</div>

<div class="images">
  {#each base64ImagesValue as image}
    <img src={image} alt="Uploaded Image" />
  {/each}

</div>

<button>
  <a href="/">Analyze Another</a>
</button>

<style>
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem; /* Add some space between images */
  }

  img {
    width: 150px; /* Set a fixed width for the images */
    height: auto; /* Maintain aspect ratio */
    margin: 0.5rem; /* Adjust margin for spacing */
  }
</style>