import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Specify protected and public routes
const protectedRoutes = ['/admin/dashboard', '/admin/vehicle', '/admin/customer', '/admin/sales', '/admin/expert', '/admin/communication', '/admin/contentmanage', '/admin/auction', '/admin/records', '/admin/profile']
const protectedRoutes2 = ['/expert/contact', '/expert/vehicle', '/expert/profile']
const protectedRoutes3 = ['/profile', '/records']
const publicRoutes = ['/admin/login']
const publicRoutes2 = ['/expert/login']
const publicRoutes3 = ['/home']

export default async function middleware(req) {
  const path = req.nextUrl.pathname

  // Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.includes(path)
  const isProtectedRoute2 = protectedRoutes2.includes(path)
  const isProtectedRoute3 = protectedRoutes3.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  const isPublicRoute2 = publicRoutes2.includes(path)
  const isPublicRoute3 = publicRoutes3.includes(path)

  // Decrypt the session from the cookie
  const token = cookies().get('token')?.value
  const expertToken = cookies().get('expert')?.value
  const customertToken = cookies().get('customer')?.value

  // Redirect to /admin/login if the user is not authenticated for admin routes
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
  }

  // Redirect to /expert/login if the user is not authenticated for expert routes
  if (isProtectedRoute2 && !expertToken) {
    return NextResponse.redirect(new URL('/expert/login', req.nextUrl))
  }
  if (isProtectedRoute3 && !customertToken) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }

  // Redirect to /admin/dashboard if the admin is authenticated and trying to access /admin/login
  if (isPublicRoute && token && !req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl))
  }

  // Redirect to /expert/dashboard if the expert is authenticated and trying to access /expert/login
  if (isPublicRoute2 && expertToken && !req.nextUrl.pathname.startsWith('/expert/contact')) {
    return NextResponse.redirect(new URL('/expert/contact', req.nextUrl))
  }
  if (isPublicRoute3 && customertToken && !req.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
