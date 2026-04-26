import React from 'react';
import {
  Box, Stepper, Step, StepLabel, StepContent,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ArrowForward, Description, PanTool } from '@mui/icons-material';
import HomeSavingsCalculator from '../../shared/HomeSavingsCalculator';
 
const steps = [
  {
    label: 'Why Buy a House?',
    description: `Buying a home is one of the biggest leaps toward financial independence you can take. Here's why it's worth the effort:
 
• Build Equity: Every mortgage payment chips away at what you owe and builds ownership in an appreciating asset.
• Stability: Lock in your housing costs — no landlord can raise your rent or end your lease.
• Creative Control: It's yours to paint, renovate, and make your own.
• Tax Benefits: You may be able to deduct mortgage interest and property taxes.`,
    icon: <SavingsIcon style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'Can You Afford It?',
    description: `The true cost of a home goes well beyond the sticker price. Closing costs, inspection fees, and maintenance reserves can easily add 5–10% on top of the purchase price.
 
Use the calculator on the right to estimate how much you should have saved before you start shopping. It factors in your down payment percentage and closing costs to give you a realistic savings target.
 
For a full monthly payment breakdown and loan options tailored to your situation, head to the Financing page once you're done here.`,
    icon: <AssignmentIcon style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'The Homebuying Roadmap',
    description: `Before you start touring houses, understand the sequence — skipping steps often leads to heartbreak and lost deposits.
 
1. Check Your Credit: Higher scores unlock significantly lower interest rates.
2. Get Pre-Approved: Shows sellers you're a serious buyer and sets your real budget.
3. Find an Agent: A buyer's agent typically costs you nothing but can save you thousands.
4. Define Your Needs: Separate your must-haves from your nice-to-haves before you fall in love with a place.`,
    icon: <HomeIcon style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'Your Document Checklist',
    description: `Lenders will want to verify your financial history. Start pulling these together now so you're not scrambling later:
 
• Proof of Income: Last two years of W-2s and your most recent pay stubs.
• Tax Returns: Federal filings for the past two years.
• Bank Statements: 60 days of history for all checking and savings accounts.
• ID & Social Security: A valid driver's license or passport.`,
    icon: <Description style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'Common Pitfalls to Avoid',
    description: `Small mistakes early in the process can cost you big later. Watch out for these:
 
• Opening New Credit: No new car loans or credit cards — lenders will notice.
• Changing Jobs: Lenders want to see 2+ years of consistent employment history.
• Draining Savings: Keep an emergency fund in reserve beyond your down payment.
• Ignoring Location: You can renovate a kitchen, but you can't move the neighborhood.`,
    icon: <PanTool style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'Next Steps',
    description: `Once you've worked through the calculator on this page, you're ready to go deeper.
 
• Review your savings target in the summary above.
• Head to the Financing page to explore loan types and monthly payment estimates.
• Compare purchasing methods based on your credit score and savings.`,
    icon: <ArrowForward style={{ color: '#2e7d32' }} />,
  },
];
 
function GettingStarted() {
  return (
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', p: 3 }}>
      {/* Left: Stepper */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
 
        {/* Intro block */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: grey[900], lineHeight: 1.15, mb: 1.5 }}>
            Your first steps to homeownership
          </Typography>
          <Typography variant="h6" sx={{ color: grey[600], fontWeight: 400 }}>
            Buying a home is one of the biggest financial decisions you'll make.
            Work through each step below — and use the calculator on the right to
            set your savings target before you dive in.
          </Typography>
        </Box>
 
        <Stepper activeStep={-1} nonLinear orientation="vertical">
          {steps.map((step) => (
            <Step key={step.label} expanded>
              <StepLabel icon={step.icon}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: grey[900], lineHeight: 1.2 }}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" sx={{ color: grey[800], lineHeight: 1.7, whiteSpace: 'pre-line', fontSize: '1rem', mt: 1 }}>
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
 
      {/* Right: Calculator */}
      <Box
        sx={{
          width: 380,
          flexShrink: 0,
          position: 'sticky',
          top: 24,
          alignSelf: 'flex-start',
        }}
      >
        <HomeSavingsCalculator />
      </Box>
    </Box>
  );
}
 
export default GettingStarted;
