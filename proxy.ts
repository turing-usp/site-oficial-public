import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Criamos a resposta inicial
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
          // Atualiza tanto o request quanto a response para evitar dessincronização
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: Use getUser() para segurança, mas cuidado com redirecionamentos imediatos em caso de erro de rede
  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // 1. Se NÃO está logado e tenta acessar plataforma
  if (!user && pathname.startsWith('/plataforma')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. Se JÁ está logado e tenta acessar login/cadastro
  if (user && (pathname === '/login' || pathname === '/cadastre-se')) {
    return NextResponse.redirect(new URL('/plataforma', request.url))
  }

  // 3. PROTEÇÃO DE ADMIN (Onde o loop costuma morar)
  if (user && pathname.startsWith('/plataforma/admin')) {
    const { data: perfil } = await supabase
      .from('Perfis')
      .select('tipo_usuario')
      .eq('id', user.id)
      .single()

    if (perfil?.tipo_usuario !== 2) {
      // Importante: redireciona para a base da plataforma, não para a mesma rota
      return NextResponse.redirect(new URL('/plataforma', request.url))
    }
  }

  // 4. Lógica de Nova Senha
  if (pathname === '/nova-senha') {
    const hasCode = request.nextUrl.searchParams.has('code')
    if (!user && !hasCode) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('reason', 'acesso-negado')
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: ['/plataforma/:path*', '/login', '/cadastre-se', '/nova-senha'],
}