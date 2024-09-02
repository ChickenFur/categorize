<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header>
	<h1>
		Categorizer {#if $page.url.pathname === "/results"} Results {/if}
	</h1>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}


	h1 {
		display: flex;
		justify-content: center;
		text-align: center;
		--background: rgba(255, 255, 255, 0.7);
		margin: auto;
		border-radius: 4em;
		padding: 0.5em;
	}

	
</style>
