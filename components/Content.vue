<template>
  <div class="relative z-20 bg-white min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white min-h-screen flex items-center relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-8">
            <span class="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-mono mb-4">
              ERROR 404: CULTURE NOT FOUND
            </span>
          </div>
          <h1 class="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            404MUSEUM
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
            Le premier musée digital dédié à la préservation de la culture d'Internet
          </p>
          <p class="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
            Explorez, découvrez et préservez les moments iconiques, les mèmes légendaires et l'évolution de notre culture numérique
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Commencer l'exploration
            </button>
            <button class="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Découvrir la mission
            </button>
          </div>
        </div>
      </div>

      <!-- Animated background elements -->
      <div class="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
      <div class="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
      <div class="absolute bottom-20 left-20 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
    </section>

    <!-- About Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Préserver l'<span class="text-purple-600">héritage numérique</span>
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Internet a créé une culture unique, éphémère et en constante évolution. 404Museum sauvegarde ces moments précieux pour les générations futures.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Archives Vivantes</h3>
              <p class="text-gray-600">
                Collection interactive de sites web historiques, forums légendaires et communautés qui ont façonné Internet.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Mèmes & Culture</h3>
              <p class="text-gray-600">
                Musée des mèmes iconiques, des tendances virales et des phénomènes culturels qui ont marqué l'histoire du web.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Chronologie Interactive</h3>
              <p class="text-gray-600">
                Voyage dans le temps à travers l'évolution d'Internet, des premiers sites aux réseaux sociaux modernes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Une expérience <span class="text-purple-600">immersive</span>
            </h2>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-3xl font-bold text-gray-800 mb-6">Explorez en 3D</h3>
              <p class="text-lg text-gray-600 mb-8">
                Naviguez dans un environnement 3D interactif où chaque salle représente une époque différente d'Internet.
                De l'ère des forums aux réseaux sociaux, découvrez l'évolution de notre culture numérique.
              </p>
              <ul class="space-y-4">
                <li class="flex items-center">
                  <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700">Navigation intuitive en réalité virtuelle</span>
                </li>
                <li class="flex items-center">
                  <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700">Contenu interactif et multimédia</span>
                </li>
                <li class="flex items-center">
                  <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700">Expériences personnalisées</span>
                </li>
              </ul>
            </div>

            <div class="bg-gradient-to-br from-purple-100 to-cyan-100 p-8 rounded-2xl">
              <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                  <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <span class="text-sm text-gray-500 font-mono">museum.404.net</span>
                </div>
                <div class="space-y-3">
                  <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div class="h-4 bg-purple-200 rounded w-1/2 animate-pulse"></div>
                  <div class="h-8 bg-gradient-to-r from-cyan-200 to-purple-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              Galerie des <span class="text-cyan-400">légendes</span>
            </h2>
            <p class="text-xl text-gray-300">
              Découvrez quelques-unes des pièces les plus emblématiques de notre collection
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div class="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <span class="text-2xl font-bold">MySpace Era</span>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">L'âge d'or des profils</h3>
                <p class="text-gray-400">Quand personnaliser son profil était un art</p>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <span class="text-2xl font-bold">Flash Games</span>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">L'époque Flash</h3>
                <p class="text-gray-400">Newgrounds et l'âge d'or du gaming web</p>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div class="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span class="text-2xl font-bold">Forums</span>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">Communautés légendaires</h3>
                <p class="text-gray-400">Quand Internet était fait de forums</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Rejoignez la préservation
          </h2>
          <p class="text-xl mb-8 text-purple-100">
            Aidez-nous à sauvegarder la culture d'Internet pour les générations futures
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Contribuer au musée
            </button>
            <button class="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Explorer maintenant
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8">
            <div class="md:col-span-2">
              <h3 class="text-2xl font-bold mb-4 text-cyan-400">404MUSEUM</h3>
              <p class="text-gray-400 mb-4">
                Préserver la culture d'Internet, une page 404 à la fois.
              </p>
              <div class="flex space-x-4">
                <button class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span class="sr-only">Twitter</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span class="sr-only">Discord</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h4 class="text-lg font-semibold mb-4">Explorer</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Archives</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Chronologie</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Mèmes</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Communautés</a></li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold mb-4">Contribuer</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Soumettre du contenu</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Devenir curateur</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 404Museum. Préservant Internet depuis que les pages 404 existent.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>