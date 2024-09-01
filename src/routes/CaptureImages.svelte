<script lang="ts">
  import {navigate} from 'svelte-routing';
  let files: FileList | null = null;

  let uploadedImage: string | null = null;

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
      reader.onload = function () {
        uploadedImage = reader.result as string;
        console.log(uploadedImage);
      };
    }
  }

  async function makeAPICall(): Promise<void> {
    if (!uploadedImage) return;

    try {
      const response = await fetch('/open-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: uploadedImage })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API call successful:', result);
        navigate('/routes');
      } else {
        console.error('API call failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  }
</script>

{#if uploadedImage}
  <img src={uploadedImage} alt="Uploaded image to be sent" />
  
{/if}

{#if !uploadedImage}
  <h1>Upload an image to be categorized and priced</h1>
  <label for="avatar">Upload a picture:</label>
  <input accept="image/png, image/jpeg, image/heic" id="avatar" name="avatar" type="file" on:change={onFileSelected} />
{/if}
  
<!-- <label for="many">Upload multiple files of any type:</label>
<input id="many" multiple type="file" on:change={onFileSelected} /> -->
{#if uploadedImage}
  <button on:click={makeAPICall}>Submit to AI</button>
{/if}

<style>
 
</style>