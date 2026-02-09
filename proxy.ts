import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { error } from 'console'
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
  const { data: { user },error } = await supabase.auth.getUser()

  // Se houver erro na verificação do user (como user não encontrado no banco),
  // force o redirecionamento mesmo que o cookie exista.
  if ((!user || error) && request.nextUrl.pathname.startsWith('/plataforma')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 3. Se JÁ estiver logado e tentar acessar login/cadastro, redireciona para plataforma
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/cadastre-se')) {
    return NextResponse.redirect(new URL('/plataforma', request.url))
  }

  // 4. PROTEÇÃO DE ADMIN: Se a rota for /plataforma/admin, checamos o tipo no banco
  if (request.nextUrl.pathname.startsWith('/plataforma/admin')) {
    const { data: perfil } = await supabase
      .from('Perfis')
      .select('tipo_usuario')
      .eq('id', user?.id)
      .single()

    if (perfil?.tipo_usuario !== 2) {
      // Se não for admin (tipo 2), manda para a home da plataforma
      return NextResponse.redirect(new URL('/plataforma', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/plataforma/:path*', '/login', '/cadastre-se'], // Monitora plataforma + páginas de auth
}