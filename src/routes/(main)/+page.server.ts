import NTHUAIS from 'nthuais-sdk'
import { fail, isRedirect, redirect } from '@sveltejs/kit'
import { PB_TYPEGEN_URL, PB_TYPEGEN_EMAIL, PB_TYPEGEN_PASSWORD } from '$env/static/private'
import Pocketbase from 'pocketbase'
import { type TypedPocketBase } from '$lib/pocketbase-types.js'

export const load = async ({ cookies }) => {
  const auth = cookies.get('NTHUAISAuth')
  const client = new NTHUAIS()

  if (auth) {
    try {
      client.setAuth(JSON.parse(auth))
      await client.getTranscript()
      return redirect(303, '/platform')
    }
    catch (err) {
      if (isRedirect(err)) {
        return redirect(err.status, err.location)
      }
      else {
        cookies.delete('NTHUAISAuth', { path: '/' })
      }
    }
  }
}

export const actions = {
  async default({ request, cookies }) {
    const data = await request.formData()
    const studentid = data.get('studentid') as string
    const password = data.get('password') as string

    if (!studentid || !password) {
      return fail(400, { message: 'Bad Request' })
    }

    const client = new NTHUAIS()
    let transcript: Awaited<ReturnType<NTHUAIS['getTranscript']>>

    try {
      await client.signin(studentid, password)
      transcript = await client.getTranscript()
      cookies.set('NTHUAISAuth', JSON.stringify(client.getAuth()), { path: '/' })
    }
    catch (err) {
      if (err instanceof Error) {
        return fail(403, { message: err.message })
      }
      else {
        return fail(500, { message: 'Internal Server Error' })
      }
    }

    if (!transcript.student.studentid) {
      return fail(500, { message: 'Internal Server Error' })
    }

    const apb = new Pocketbase(PB_TYPEGEN_URL) as TypedPocketBase

    try {
      await apb.admins.authWithPassword(PB_TYPEGEN_EMAIL, PB_TYPEGEN_PASSWORD)
    }
    catch (err) {
      return fail(500, { message: 'Internal Server Error' })
    }

    let isInit: boolean

    try {
      await apb.collection('students').getOne(transcript.student.studentid.padEnd(15, '_'))
      isInit = false
    }
    catch (err) {
      isInit = true
    }

    try {
      if (isInit) {
        await apb.collection('students').create({
          id: transcript.student.studentid.padEnd(15, '_'),
          student_id: transcript.student.studentid,
          name: transcript.student.name_zh,
          department: transcript.student.class_name_zh,
          credits: transcript.credits.passed_credits,
          pending_credits: transcript.credits.pending_credits,
          grades: transcript.grades
        })
      }
      else {
        await apb.collection('students').update(transcript.student.studentid.padEnd(15, '_'), {
          credits: transcript.credits.passed_credits,
          pending_credits: transcript.credits.pending_credits,
          grades: transcript.grades
        })
      }
    }
    catch (err) {
      return fail(500, { message: 'Internal Server Error' })
    }

    return redirect(303, '/platform')
  }
}