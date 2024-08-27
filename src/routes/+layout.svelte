<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n'
	import { Toaster } from '$lib/components/ui/sonner'

	import '../app.css'
	import '@fontsource/geist-sans'
</script>

<ParaglideJS {i18n}>
	<slot></slot>
</ParaglideJS>

<Toaster/>