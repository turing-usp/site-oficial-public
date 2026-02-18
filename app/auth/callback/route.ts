import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Verifica se existe o parâmetro 'next' na URL
  const next = searchParams.get('next') ?? '/plataforma'

  if (code) {
    const cookieStore = await cookies()

    // 1. Criamos a resposta de redirecionamento primeiro
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            // 2. Seta os cookies no store (servidor)
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
            // 3. Seta os cookies na RESPOSTA (navegador) - ISSO PREVINE O LOOP
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
    const response = NextResponse.redirect(`${origin}${next}`)
    // O setAll acima já deve ter injetado os cookies no cookieStore, 
    // mas para garantir o redirecionamento imediato com a sessão:
    return response
    }
    }
  // Se houver erro ou não houver código
  return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}