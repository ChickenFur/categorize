<script lang="ts">
  import {goto} from "$app/navigation"
  import {categorized, categorizationSchema} from '$lib/categorized'
  import {base64Images} from '$lib/base64Images'
	import { fade } from "svelte/transition";
  import { resizeImage } from '$lib/ImageResize';
  let files: FileList | null = null;

  let uploadedImage1: string | null = null;
  let uploadedImage2: string | null = null;
  let isLoading = false; // Track loading state

  base64Images.set([]);

  $: if (files) {
    // Note that `files` is of type `FileList`, not an Array:
    // https://developer.mozilla.org/en-US/docs/Web/API/FileList
    console.log(files);

    for (const file of files) {
      console.log(`${file.name}: ${file.size} bytes`);
    }
  }

  function onFileSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      files = input.files;
      console.log(files);
      let reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = async function () {
        const resizedImage = await resizeImage(reader.result as string, 800, 800)
        if(uploadedImage1){
          uploadedImage2 = resizedImage 
          base64Images.update((images) => {
            return [...images, uploadedImage2!]
          })
        }else{
          const resizedImage = await resizeImage(reader.result as string, 800, 800)
          uploadedImage1 = resizedImage
          base64Images.update((images) => {
            return [...images, uploadedImage1!]
          })
        }
      };
    }
  }

  async function makeAPICall(): Promise<void> {
    if (!uploadedImage1) return;
    isLoading = true; // Set loading state to true

    try {
      const response = await fetch('/open-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ images: [uploadedImage1, uploadedImage2] })
      });

      if (response.ok) {
        const result = await response.json();
       
        try{
          const parsedResults = categorizationSchema.parse(JSON.parse(result.choices[0].message.content))
          console.log('API call successful:', parsedResults);
          categorized.set(parsedResults);
          
          goto('/results');
        }catch(e){
          console.log(e)
        }
      } else {
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error making API call:', error);
      
    }finally{
      isLoading = false; // Set loading state to false
  }
}
</script>

{#if isLoading}
   <div class="loading-spinner" in:fade></div>
{/if}

{#if !isLoading}
<div class="image-upload-wrapper">
  <h1>Upload images of the tag and the clothes</h1>
  <div class="image-container">
    {#if uploadedImage1}
      <img src={uploadedImage1} alt="Uploaded image to be sent" />
      
    {/if}

    {#if uploadedImage2}
      <img src={uploadedImage2} alt="Uploaded image to be sent" />
      
    {/if}
  </div>

  {#if !uploadedImage1}
    <div>
      <h1>Step 1: Image of the tag</h1>
      <label for="image1" class="submit-button">Upload a picture</label>
      <input style="display: none;" accept="image/png, image/jpeg, image/heic" id="image1" name="image1" type="file" on:change={onFileSelected} />
    </div>
  {/if}

  {#if !uploadedImage2}
    <div>
      <h1>Step 2 Image of the clothes</h1>
      <label for="image2" class="submit-button">Upload a picture:</label>
      <input style="display: none;" accept="image/png, image/jpeg, image/heic" id="image2" name="image2" type="file" on:change={onFileSelected} />
    </div>
  {/if}
    
  <!-- <label for="many">Upload multiple files of any type:</label>
  <input id="many" multiple type="file" on:change={onFileSelected} /> -->
  <br/>
  {#if uploadedImage1 && uploadedImage2}
    <button class="submit-button" on:click={makeAPICall}>Submit to AI</button>
  {/if}
</div>
{/if}

<style>
 .loading-spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .image-upload-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem; /* Add some space between elements */
  }

  .image-container {
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

  .submit-button, input[type="file"] {
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

  .submit-button:hover, input[type="file"]{
    background-color: #2980b9; /* Darker blue on hover */
  }

  .submit-button:active, input[type="file"] {
    background-color: #1c598a; /* Even darker blue on click */
  }
 
</style>