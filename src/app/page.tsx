'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Atom,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  FlaskConical,
  Cpu,
  ArrowUp,
  ZoomIn,
  ZoomOut,
  GraduationCap,
  Users,
  Heart,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { chapterDefinitions } from '@/lib/fascicule-data';

const chapters = chapterDefinitions;

export default function Home() {
  const [selectedPage, setSelectedPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= 120) {
      setSelectedPage(page);
      setShowWelcome(false);
      setImageZoom(1);
    }
  };

  const goToPreviousPage = () => goToPage(selectedPage - 1);
  const goToNextPage = () => goToPage(selectedPage + 1);

  const chemistryChapters = chapters.filter(c => c.part === 'chimie');
  const physicsChapters = chapters.filter(c => c.part === 'physique');

  const getCurrentChapter = () => {
    return chapters.find(ch => selectedPage >= ch.startPage && selectedPage <= ch.endPage);
  };

  const currentChapter = getCurrentChapter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl shadow-lg">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent">
                  Sciences Physiques
                </h1>
                <p className="text-xs text-slate-500 font-medium">Fascicule Numérique Interactif</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-blue-100 text-blue-800 border border-blue-200">
              <BookOpen className="h-3 w-3 mr-1" />
              Page {selectedPage} / 120
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed lg:sticky top-[65px] left-0 z-40 h-[calc(100vh-65px)] w-72 bg-white/95 backdrop-blur-sm border-r border-blue-100 transition-transform duration-300 lg:translate-x-0 overflow-y-auto shadow-xl lg:shadow-none',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-4">
            {/* Concepteur */}
            <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Conception</span>
              </div>
              <p className="text-sm font-bold text-slate-700">M. Doro Cissé</p>
              <p className="text-xs text-slate-500">Prof. Sciences Physiques</p>
              <p className="text-xs text-slate-500">Lycée de Thiaroye</p>
            </div>

            {/* Quick Navigation */}
            <div className="mb-4">
              <h3 className="font-semibold text-slate-600 mb-2 text-sm">Navigation Rapide</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { goToPage(1); setShowWelcome(false); }}
                  className="text-xs border-blue-200 hover:bg-blue-50"
                >
                  Couverture
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { goToPage(2); setShowWelcome(false); }}
                  className="text-xs border-blue-200 hover:bg-blue-50"
                >
                  Sommaire
                </Button>
              </div>
            </div>

            <Separator className="my-3 bg-blue-100" />

            {/* Chemistry */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 px-1">
                <FlaskConical className="h-4 w-4 text-emerald-600" />
                <h3 className="font-bold text-emerald-700 text-sm uppercase tracking-wide">
                  Chimie
                </h3>
              </div>
              <nav className="space-y-0.5">
                {chemistryChapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => { goToPage(chapter.startPage); setShowWelcome(false); }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200',
                      currentChapter?.id === chapter.id
                        ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 font-semibold shadow-sm border-l-4 border-emerald-500'
                        : 'hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                    )}
                  >
                    <span className="font-mono text-xs mr-1 opacity-70">{chapter.number}</span>
                    <span className="text-xs">{chapter.title}</span>
                  </button>
                ))}
              </nav>
            </div>

            <Separator className="my-3 bg-blue-100" />

            {/* Physics */}
            <div>
              <div className="flex items-center gap-2 mb-2 px-1">
                <Cpu className="h-4 w-4 text-blue-600" />
                <h3 className="font-bold text-blue-700 text-sm uppercase tracking-wide">
                  Physique
                </h3>
              </div>
              <nav className="space-y-0.5">
                {physicsChapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => { goToPage(chapter.startPage); setShowWelcome(false); }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200',
                      currentChapter?.id === chapter.id
                        ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-semibold shadow-sm border-l-4 border-blue-500'
                        : 'hover:bg-blue-50 text-slate-600 hover:text-blue-700'
                    )}
                  >
                    <span className="font-mono text-xs mr-1 opacity-70">{chapter.number}</span>
                    <span className="text-xs">{chapter.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Welcome Section */}
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50 to-indigo-50">
                <div className="relative">
                  {/* Decorative background */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
                  </div>
                  
                  <div className="relative p-6 lg:p-8">
                    {/* Title */}
                    <div className="text-center mb-6">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white text-sm font-medium shadow-lg mb-4"
                      >
                        <Sparkles className="h-4 w-4" />
                        Fascicule de Sciences Physiques
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                      
                      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                        Bienvenue sur votre espace d'apprentissage
                      </h2>
                      <p className="text-slate-600 max-w-2xl mx-auto">
                        Un outil pédagogique numérique interactif conçu pour accompagner 
                        les élèves et enseignants dans l'étude des Sciences Physiques.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-white/80 rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <FlaskConical className="h-5 w-5 text-emerald-600" />
                          </div>
                          <h3 className="font-semibold text-slate-700">Chimie</h3>
                        </div>
                        <p className="text-sm text-slate-500">10 chapitres avec exercices corrigés</p>
                      </div>
                      <div className="p-4 bg-white/80 rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Cpu className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-slate-700">Physique</h3>
                        </div>
                        <p className="text-sm text-slate-500">14 chapitres avec exercices corrigés</p>
                      </div>
                      <div className="p-4 bg-white/80 rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-amber-100 rounded-lg">
                            <BookOpen className="h-5 w-5 text-amber-600" />
                          </div>
                          <h3 className="font-semibold text-slate-700">120 Pages</h3>
                        </div>
                        <p className="text-sm text-slate-500">Contenu complet du programme</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button
                        onClick={() => { goToPage(1); setShowWelcome(false); }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg px-6"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Commencer la lecture
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => { goToPage(2); setShowWelcome(false); }}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 px-6"
                      >
                        Voir le sommaire
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Chapter Info */}
          {currentChapter && !showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mb-4 p-4 rounded-xl shadow-md",
                currentChapter.part === 'chimie' 
                  ? "bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500" 
                  : "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500"
              )}
            >
              <div className="flex items-center gap-3">
                <Badge className={cn(
                  "text-white shadow-md",
                  currentChapter.part === 'chimie' ? "bg-emerald-600" : "bg-blue-600"
                )}>
                  Chapitre {currentChapter.number}
                </Badge>
                <span className="font-bold text-lg text-slate-800">{currentChapter.title}</span>
              </div>
            </motion.div>
          )}

          {/* Page Display */}
          {!showWelcome && (
            <Card className="shadow-2xl border-0 overflow-hidden mb-4">
              <CardHeader className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Page {selectedPage} du Fascicule
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setImageZoom(Math.max(0.5, imageZoom - 0.25))}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm w-14 text-center bg-white/10 rounded py-0.5">
                      {Math.round(imageZoom * 100)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setImageZoom(Math.min(3, imageZoom + 0.25))}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 flex justify-center overflow-auto min-h-[700px]">
                <motion.img
                  key={selectedPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={`/fascicule_images/page_${selectedPage}.png`}
                  alt={`Page ${selectedPage} du fascicule de Sciences Physiques`}
                  className="max-w-full h-auto shadow-2xl rounded-lg border border-slate-300"
                  style={{ transform: `scale(${imageZoom})`, transformOrigin: 'top center' }}
                />
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          {!showWelcome && (
            <>
              <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 border border-slate-200">
                <Button
                  variant="outline"
                  onClick={goToPreviousPage}
                  disabled={selectedPage <= 1}
                  className="gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Aller à la page :</span>
                  <input
                    type="number"
                    value={selectedPage}
                    onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={1}
                    max={120}
                  />
                  <span className="text-sm text-slate-500">/ 120</span>
                </div>

                <Button
                  variant="outline"
                  onClick={goToNextPage}
                  disabled={selectedPage >= 120}
                  className="gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Page Quick Select */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {Array.from({ length: 25 }, (_, i) => selectedPage - 12 + i)
                  .filter(page => page >= 1 && page <= 120)
                  .map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === selectedPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => goToPage(pageNumber)}
                      className={cn(
                        "w-9 h-9 p-0 text-xs font-medium transition-all",
                        pageNumber === selectedPage 
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                          : "border-slate-300 hover:border-blue-400 hover:bg-blue-50"
                      )}
                    >
                      {pageNumber}
                    </Button>
                  ))}
              </div>
            </>
          )}

          {/* Footer */}
          <footer className="mt-10 pt-8 border-t border-slate-200">
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 rounded-2xl p-6 lg:p-8 text-white shadow-2xl">
              <div className="max-w-4xl mx-auto text-center">
                {/* Logo & Title */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Atom className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Fascicule de Sciences Physiques</h3>
                    <p className="text-blue-200 text-sm">Exercices Corrigés • Classes de Première</p>
                  </div>
                </div>

                <Separator className="my-4 bg-white/20" />

                {/* Concepteur */}
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <GraduationCap className="h-5 w-5 text-amber-400" />
                    <span className="text-amber-400 font-semibold uppercase tracking-wider text-sm">
                      Conception & Réalisation
                    </span>
                  </div>
                  <p className="text-xl font-bold">M. Doro Cissé</p>
                  <p className="text-blue-200">Professeur de Sciences Physiques</p>
                  <p className="text-blue-300 text-sm">Lycée de Thiaroye, Sénégal</p>
                </div>

                <Separator className="my-4 bg-white/20" />

                {/* Dédié à */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">
                    Destiné à
                  </span>
                </div>
                <p className="text-lg text-blue-100 mb-2">
                  Les élèves et enseignants de Sciences Physiques
                </p>
                <p className="text-sm text-blue-300 max-w-xl mx-auto">
                  Cet outil pédagogique numérique a été conçu avec passion pour faciliter 
                  l'apprentissage et l'enseignement des Sciences Physiques. 
                  Il constitue un support de qualité pour accompagner les apprenants 
                  dans leur parcours académique.
                </p>

                <div className="mt-6 flex items-center justify-center gap-2 text-blue-300">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <span className="text-sm">
                    Conçu avec dévouement pour l'éducation scientifique au Sénégal
                  </span>
                  <Heart className="h-4 w-4 text-rose-400" />
                </div>

                <div className="mt-4 text-xs text-blue-400">
                  © {new Date().getFullYear()} - Tous droits réservés
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all z-50"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
