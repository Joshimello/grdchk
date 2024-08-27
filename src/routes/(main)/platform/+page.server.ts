import { redirect } from '@sveltejs/kit'
import Pocketbase from 'pocketbase'
import { type TypedPocketBase } from '$lib/pocketbase-types.js'

export const load = ({ cookies }) => {
  if (!cookies.get('NTHUAISAuth')) {
    return redirect(302, '/')
  }
}