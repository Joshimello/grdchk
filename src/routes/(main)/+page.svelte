<script lang="ts">
  import SignIn from '$lib/components/sign-in.svelte'
	import { Button } from '$lib/components/ui/button'
  import { onMount } from 'svelte'
	import { toast } from 'svelte-sonner'
  import * as Alert from '$lib/components/ui/alert'
	import { ExclamationTriangle } from 'svelte-radix';

  export let form
</script>

<div class="flex flex-col">
  <span class="text-6xl font-bold block">
    Graduation eligibility checker
  </span>
  <span class="text-lg text-muted-foreground">
    Sign in with your academic information system account to continue.
  </span>
  <div class="mt-12">
    {#if form}
      <Alert.Root variant="destructive" class="w-max mb-2">
        <ExclamationTriangle class="h-4 w-4" />
        <Alert.Title>
          Error signing in
        </Alert.Title>
        <Alert.Description>
          {form.message}
        </Alert.Description>
      </Alert.Root>
    {/if}
    <SignIn let:builder>
      <Button builders={[builder]}>
        Sign in now
      </Button>
    </SignIn>
  </div>
</div>