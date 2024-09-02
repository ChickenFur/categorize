<script lang="ts">
    import {categorized} from '$lib/categorized'
    import type {Categorization} from '$lib/categorized'
    import {base64Images} from '$lib/base64Images'
	  import { goto } from '$app/navigation';

    let categorizedValue: Categorization
    let base64ImagesValue: string[]
    
    categorized.subscribe(value => {
        categorizedValue = value
    })
    base64Images.subscribe(value => {
        base64ImagesValue = value
    })

    const handleButtonClick = () => {
        goto('/')
    }


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

<button class="submit-button" on:click={handleButtonClick}>
  Analyze Another
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
  .submit-button {
  background-color: #3498db; /* Blue background */
    color: white; /* White text */
    padding: 15px 30px; /* Bigger padding */
    font-size: 1.2rem; /* Larger font size */
    border: none; /* Remove default border */
    border-radius: 25px; /* Rounder corners */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
    margin-top: 1rem; /* Add some space above the button */
  }

  .submit-button:hover {
    background-color: #2980b9; /* Darker blue on hover */
  }

  .submit-button:active {
    background-color: #1c598a; /* Even darker blue on click */
  }
</style>