<script>
	import CaptureImages from './CaptureImages.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Categorizer" />
</svelte:head>

<section>
	<CaptureImages/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	
</style>
