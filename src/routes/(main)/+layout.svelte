<script lang="ts">
  import * as I from 'lucide-svelte'
  import { Button } from '$lib/components/ui/button'
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import { i18n } from '$lib/i18n.js'
  import { page } from '$app/stores'
  import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime.js'
  import SignIn from '$lib/components/sign-in.svelte'
</script>

<div class="container min-h-screen">
  <div class="flex py-12 justify-between">
    <div class="flex gap-2 items-center">
      <I.GraduationCap size="26" />
      <span class="font-bold text-lg">grdchk</span>
    </div>
    <div class="flex gap-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button size="icon" variant="ghost" builders={[builder]}>
            <I.Globe size="16" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          {#each availableLanguageTags as lang}
            <DropdownMenu.Item 
              class="flex gap-2 items-center capitalize"
              href={i18n.route($page.url.pathname)}
              hreflang={lang}
              disabled={lang === languageTag()}
            >
              {#if lang === languageTag()}
                <I.Check size="14" />
              {/if}
              {lang}
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <SignIn let:builder>
        <Button size="icon" variant="ghost" builders={[builder]}>
          <I.UserCircle size="16" />
        </Button>
      </SignIn>
    </div>
  </div>
  <slot></slot>
</div>