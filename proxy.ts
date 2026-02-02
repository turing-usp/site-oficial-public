import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
        response = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  }
)

  // 1. Pega o usuário do cookie
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Se tentar entrar em rota protegida sem login, tchau.
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 3. PROTEÇÃO DE ADMIN: Se a rota for /dashboard/admin, checamos o tipo no banco
  if (request.nextUrl.pathname.startsWith('/dashboard/admin')) {
    const { data: perfil } = await supabase
      .from('Perfis')
      .select('tipo_usuario')
      .eq('id', user?.id)
      .single()

    if (perfil?.tipo_usuario !== 2) {
      // Se não for admin (tipo 2), manda para a home do dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*'], // Monitora tudo dentro de dashboard
}