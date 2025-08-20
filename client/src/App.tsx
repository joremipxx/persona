import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/components/LandingPage';
import { PersonaFlow } from '@/components/PersonaFlow';
import { Step2Demographics } from '@/components/steps/Step2Demographics';
import { Step3Professional } from '@/components/steps/Step3Professional';
import { Step4Career } from '@/components/steps/Step4Career';
import { Step5WorkCharacteristics } from '@/components/steps/Step5WorkCharacteristics';
import { Step6WorkStyle } from '@/components/steps/Step6WorkStyle';
import { Step7ConsumptionHabits } from '@/components/steps/Step7ConsumptionHabits';
import { PersonaOverview } from '@/components/PersonaOverview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-persona" element={<PersonaFlow />} />
        <Route path="/step-2-demographics" element={<Step2Demographics />} />
        <Route path="/step-3-professional" element={<Step3Professional />} />
        <Route path="/step-4-career" element={<Step4Career />} />
        <Route path="/step-5-work-characteristics" element={<Step5WorkCharacteristics />} />
        <Route path="/step-6-work-style" element={<Step6WorkStyle />} />
        <Route path="/step-7-consumption-habits" element={<Step7ConsumptionHabits />} />
        <Route path="/persona-overview" element={<PersonaOverview />} />
      </Routes>
    </Router>
  );
}

export default App;
