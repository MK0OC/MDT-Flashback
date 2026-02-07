import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes protégées nécessitant une authentification
const PROTECTED_ROUTES = ["/mdt_samd"];
const ADMIN_ROUTES = ["/mdt_admin"];

// Routes publiques accessibles uniquement sans authentification
const AUTH_ROUTES = ["/login"];

// Nom du cookie de session utilisé par better-auth
const SESSION_COOKIE_NAME = "better-auth.session_token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl; 

  // Récupérer le cookie de session
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME);
  const isAuthenticated = !!sessionToken?.value;

  // -> Routes protégées / Authentification
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
    
  

  if ((isProtectedRoute || isAdminRoute) && !isAuthenticated) {
    // Rediriger vers la page d'authentification
    const authUrl = new URL("/login", request.url);
    // Ajouter l'URL de callback pour revenir après connexion
    authUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(authUrl);
  }
  
  
  if (isAuthRoute && isAuthenticated) {
    // Ne pas rediriger si l'utilisateur a été envoyé ici pour une raison
    // (pending, suspended, no-access, admin-only)
    const reason = request.nextUrl.searchParams.get("reason");
    if (reason) {
      return NextResponse.next();
    }
    // L'utilisateur est déjà connecté, rediriger vers le dashboard
    return NextResponse.redirect(new URL("/mdt_samd", request.url));
  }

  // --- CAS 3: Routes API et public ---
  // Laisser passer sans vérification
  return NextResponse.next();
}

// Configuration du matcher pour optimiser les performances
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf:
     * - API routes (/api/*)
     * - Static files (_next/static/*)
     * - Image optimization (_next/image/*)
     * - Favicon et autres fichiers publics (*.ico, *.png, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif).*)",
  ],
};
