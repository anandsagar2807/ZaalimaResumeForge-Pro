import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import { AIToolsProvider } from './context/AIToolsContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ui/ToastContainer';
import FloatingAIAssistant from './components/FloatingAIAssistant';

// Lazy-loaded pages for instant routing and smaller initial bundle
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
const Analyze = lazy(() => import('./pages/Analyze'));
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage'));
const CoverLetterPage = lazy(() => import('./pages/CoverLetterPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage'));
const AIDashboard = lazy(() => import('./pages/AIDashboard'));
const BrutalHonestReview = lazy(() => import('./pages/BrutalHonestReview'));
const ATSOptimizer = lazy(() => import('./pages/ATSOptimizer'));
const BulletPointTransformer = lazy(() => import('./pages/BulletPointTransformer'));
const IndustryToneMatch = lazy(() => import('./pages/IndustryToneMatch'));
const FinalPolishReview = lazy(() => import('./pages/FinalPolishReview'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));
const SSOCallback = lazy(() => import('./pages/SSOCallback'));

// Premium page transition variants
const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Loading fallback with premium styling
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-medium text-slate-500">Loading...</p>
    </motion.div>
  </div>
);

const ClerkProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignUpUrl="/templates"
      afterSignInUrl="/templates"
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
};

// Animated routes wrapper with AnimatePresence for seamless transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/builder/:templateId" element={<ResumeBuilderPage />} />
            <Route path="/builder" element={<ResumeBuilderPage />} />
            <Route path="/cover-letter" element={<CoverLetterPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/ai-tools" element={<AIDashboard />} />
            <Route path="/ai-tools/brutal-review" element={<BrutalHonestReview />} />
            <Route path="/ai-tools/ats-optimizer" element={<ATSOptimizer />} />
            <Route path="/ai-tools/bullet-transformer" element={<BulletPointTransformer />} />
            <Route path="/ai-tools/industry-tone" element={<IndustryToneMatch />} />
            <Route path="/ai-tools/final-polish" element={<FinalPolishReview />} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/success" element={<PaymentSuccessPage />} />
            <Route path="/sso-callback" element={<SSOCallback />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <ResumeProvider>
            <AIToolsProvider>
              <Router>
                <ClerkProviderWithNavigate>
                  <AnimatedRoutes />
                  <FloatingAIAssistant />
                  <ToastContainer />
                </ClerkProviderWithNavigate>
              </Router>
            </AIToolsProvider>
          </ResumeProvider>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
