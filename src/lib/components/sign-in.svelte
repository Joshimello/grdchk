<script lang="ts">
  import * as Popover from "$lib/components/ui/popover"
  import { Button } from "$lib/components/ui/button"
	import { Input } from '$lib/components/ui/input'
  import * as I from 'lucide-svelte'
  import { enhance } from '$app/forms'
  import { toast } from 'svelte-sonner'
	import { goto } from '$app/navigation'

  const handleSubmit = () => {
    toast.loading('Signing in...', { duration: Number.POSITIVE_INFINITY })
  }
</script>

<Popover.Root>
  <Popover.Trigger asChild let:builder>
    <slot {builder}></slot>
  </Popover.Trigger>
  <Popover.Content align="end" class="flex flex-col gap-2">
    <span>Sign in to continue</span>
    <form class="flex flex-col gap-2" method="post" on:submit={handleSubmit}>
      <Input placeholder="Student ID" name="studentid" />
      <Input placeholder="Password" name="password" />
      <Button class="flex justify-between" type="submit">
        Sign in
        <I.LogIn size="16" />
      </Button>
    </form>
  </Popover.Content>
</Popover.Root>