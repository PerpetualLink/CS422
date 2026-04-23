import React, { useState } from 'react';
import { 
  Box, Stepper, Step, StepLabel, StepContent, 
  Button, Typography, Paper, Card, CardContent, Grid 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import AssignmentIcon from '@mui/icons-material/Assignment';

/*🏠 Why Buy a House?
Buying a home is a massive leap toward financial independence. However, most people are unaware of the complexity involved. We are here to bridge that gap.
Build Equity: Monthly payments become an investment in your future.
Stability: No more unexpected rent hikes or lease terminations.
Creative Control: It is your space to paint, renovate, and style.
Tax Benefits: Potential deductions for mortgage interest and property taxes.
💰 1. Can You Afford It?
Houses are expensive. The true cost goes well beyond the $200k–$500k "sticker price." You must account for hidden fees that many first-time buyers overlook.
The Hidden Costs:
Closing Costs: Usually 2–5% of the home price.
Earnest Money: A "good faith" deposit to secure the contract.
Inspection Fees: Upfront costs to ensure the home is safe.
Maintenance Fund: Savings for unexpected roof or HVAC repairs.
👉 Action: Use the Wizard on the right to input your data. This tool identifies the info you need before estimating your savings goals.
🗺️ 2. The Homebuying Roadmap
Before you look at houses, you need to understand the sequence. Skipping steps often leads to heartbreak and lost deposits.
Check Your Credit: High scores unlock lower interest rates.
Get Pre-Approved: This proves to sellers you are a serious buyer.
Find an Agent: A buyer’s agent usually costs you $0 but saves you thousands.
Define Your Needs: List your "must-haves" vs. "nice-to-haves" (e.g., yard vs. office).
📄 3. Your Document Checklist
You will need to prove your financial history to lenders. Start gathering these digital or physical copies now to speed up your application.
Proof of Income: Last two years of W-2s and recent pay stubs.
Tax Returns: Typically the last two years of federal filings.
Bank Statements: 60 days of history for all checking/savings accounts.
ID & Social Security: Valid driver’s license or passport.
🛑 4. Common Pitfalls to Avoid
Many first-time buyers make mistakes in the "getting started" phase that hurt their chances later.
Opening New Credit: Do not buy a new car or apply for credit cards now.
Changing Jobs: Lenders look for 2+ years of consistent employment.
Draining Savings: Ensure you have an "emergency fund" left after the down payment.
Ignoring Location: You can change the kitchen, but you can't change the neighborhood.
🚀 Next Steps
Once you have completed the Wizard on this page, you are ready for the deep dive.
Review your Pre-Calculated Summary.
Navigate to the Financing Page.
Compare Purchasing Methods based on your specific score and savings.*/

const steps = [
  {
    label: 'Assess Your Financial Health',
    description: `Before looking at houses, look at your bank account. Aim for a 620+ credit score and 3-5% for a down payment.`,
    icon: <SavingsIcon color="primary" />,
  },
  {
    label: 'Get Pre-Approved',
    description: `This is your "Golden Ticket." It tells sellers you are a serious buyer and sets your hard budget.`,
    icon: <AssignmentIcon color="primary" />,
  },
  {
    label: 'Define Your "Must-Haves"',
    description: `Separate your needs (3 bedrooms) from your wants (granite countertops). Location is the only thing you can't change later.`,
    icon: <HomeIcon color="primary" />,
  },
];

function GettingStarted() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        Let's get you home. 🏠
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        The process is a marathon, not a sprint. Follow these steps to start strong.
      </Typography>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel 
              icon={step.icon}
              onClick={() => setActiveStep(index)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="h6">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Card variant="outlined" sx={{ mb: 2, bgcolor: '#f9f9f9' }}>
                <CardContent>
                  <Typography>{step.description}</Typography>
                </CardContent>
              </Card>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Next Step'}
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, mt: 3, bgcolor: '#e3f2fd' }}>
          <Typography>Ready to run the numbers?</Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
            Try the Mortgage Calculator
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default GettingStarted;