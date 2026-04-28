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
import GlossaryTerm from '../BuyingOptions/GlossaryTerm';
import { Link } from 'react-router-dom';
import { pages } from '../../shared/navigation';
import "./GettingStarted.scss";
import { useBuyerProfile } from '../../shared/BuyerProfileContext';
 
const steps = [
  {
    label: 'Why Buy a House?',
    description: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8}}>
        <Typography>
          {"Buying a home is one of the biggest leaps toward financial independence you can take. Here's why it's worth the effort:"}
        </Typography>
        <Typography>
          • <strong>Build {<GlossaryTerm term={"Equity"}>Equity</GlossaryTerm>}:</strong> Every mortgage payment chips away at what you owe and builds ownership in an appreciating asset.
        </Typography>
        <Typography>
          • <strong>Stability:</strong> Lock in your housing costs — no landlord can raise your rent or end your lease.
        </Typography>
        <Typography>
          • <strong>Creative Control:</strong> It's yours to paint, renovate, and make your own.
        </Typography>
        <Typography>
          • <strong>Tax Benefits:</strong> You may be able to deduct mortgage interest and property taxes.
        </Typography>
      </div>
    ),
    icon: <SavingsIcon style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'Can You Afford It?',
    description: (
    <div style={{ display: "flex", flexDirection: "column", gap: 8}}>
      <Typography>
        The true cost of a home isn't the price you see on the listing; it's the price you pay over the life of your loan.
      </Typography>
      <Typography>
        While the "sticker price" covers the house itself, a standard 30-year mortgage can often result in paying back <strong>double</strong> the original loan amount once interest is factored in. Beyond the loan, first-time buyers must also budget for "hidden" immediate costs like:
      </Typography>
      <Typography>
        • <strong>{<GlossaryTerm term={"Closing costs"}>{"Closing Costs"}</GlossaryTerm>}:</strong> Typically 2%-5% of the purchase price.
      </Typography>
      <Typography>
        • <strong>Due Diligence:</strong> Professional inspection and {<GlossaryTerm term={"Appraisal Fee"}>{"appraisal fees"}</GlossaryTerm>}
      </Typography>
      <Typography>
        • <strong>Ownership Overhead:</strong> Recurring {<GlossaryTerm term={"Property Taxes"}>{"Property Taxes"}</GlossaryTerm>}, {<GlossaryTerm term={"Homeowner Insurance"}>{"insurance"}</GlossaryTerm>}
      </Typography>
      <Typography>
        Understanding these numbers upfront prevents "sticker shock" later. To see exactly how interest, taxes, and insurance impact your monthly budget, use our interactive tool on the right.
      </Typography>
    </div>
    ),
    icon: <AssignmentIcon style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'The Homebuying Roadmap',
    description: (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Typography>
        Before you start touring houses, understand the sequence — skipping steps often leads to heartbreak and lost deposits.
      </Typography>
      <Typography>
        1. <strong>Check Your Credit:</strong> Higher scores unlock significantly lower interest rates.
      </Typography>
      <Typography>
        2. <strong>Get Pre-Approved:</strong> Shows sellers you're a serious buyer and sets your real budget.
      </Typography>
      <Typography>
        3. <strong>Find an Agent:</strong> A buyer's agent typically costs you nothing but can save you thousands.
      </Typography>
      <Typography>
        4. <strong>Define Your Needs:</strong> Separate your must-haves from your nice-to-haves before you fall in love with a place.
      </Typography>
    </div>
  ),
    icon: <HomeIcon style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'Your Document Checklist',
    description: (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Typography>
        Lenders will want to verify your financial history. Start pulling these together now so you're not scrambling later:
      </Typography>
      <Typography>
        • <strong>Proof of Income:</strong> Last two years of W-2s and your most recent pay stubs.
      </Typography>
      <Typography>
        • <strong>Tax Returns:</strong> Federal filings for the past two years.
      </Typography>
      <Typography>
        • <strong>Bank Statements:</strong> 60 days of history for all checking and savings accounts.
      </Typography>
      <Typography>
        • <strong>ID & Social Security:</strong> A valid driver's license or passport.
      </Typography>
    </div>
    ),
    icon: <Description style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'Common Pitfalls to Avoid',
    description: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Typography>
          Avoiding these mistakes early can save you from serious headaches — or losing a deal entirely.
        </Typography>
        <Typography>
          • <strong>Opening New Credit:</strong> A new line of credit changes your {<GlossaryTerm term={"Debt-to-Income Ratio"}>debt-to-income</GlossaryTerm>} ratio and can disqualify you mid-process, even after pre-approval.
        </Typography>
        <Typography>
          • <strong>Changing Jobs:</strong> Lenders want two or more years of consistent employment in the same field. Switching jobs — even for more money — can defer or put your application at risk.
        </Typography>
        <Typography>
          • <strong>Draining Savings:</strong> Your down payment isn't the finish line. You'll still need cash for closing costs, moving expenses, and a post-move emergency fund.
        </Typography>
        <Typography>
          • <strong>Ignoring Location:</strong> A bad neighborhood, long commute, or poor school district will outlast any renovation. Visit at different times of day before you commit.
        </Typography>
      </div>
    ),
    icon: <PanTool style={{ color: '#2e7d32' }} />,
  },
  {
    label: 'Next Steps',
    description: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Typography>
          Once you've worked through the calculator on this page, you're ready to go deeper.
        </Typography>
        <Typography>
          • <strong>Head to the Financing page</strong> to explore loan types and monthly payment estimates.
        </Typography>
        <Typography>
          • <strong>Compare purchasing methods</strong> based on your credit score and savings.
        </Typography>
        <Typography>
          • <strong>Explore various hidden costs</strong> that may come up during your journey.
        </Typography>
      </div>
    ),
    icon: <ArrowForward style={{ color: '#2e7d32' }} />,
  },
];
 
function GettingStarted() {
  const { profile, updateProfile } = useBuyerProfile();

  return (
    <Box className={"mainPage"} sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', p: 3, width: "1500px", margin: "auto auto", padding: "32px 24px" }}>
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
                <div style={{ fontSize: "1rem" }}>
                  {step.description}
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
          <Link
            className={"financePageButton"}
            key={pages[1].name}
            onClick={() => {
              updateProfile({ "currentRoute": pages[1].route })
            }}
            to={pages[1].route}
          >
            <div>{`Go To ${pages[1].name} page`}</div>
            <ArrowForward sx={{ marginLeft: "8px", height:"44px" }}/>
          </Link>
      </Box>
 
      {/* Right: Calculator */}
      <Box
        className={"rightContainer"}
        sx={{
          width: 440,
          flexShrink: 0,
          position: 'sticky',
          top: "calc(50% - 375px)",
          alignSelf: 'flex-start',
        }}
      >
        <HomeSavingsCalculator />
      </Box>
    </Box>
  );
}
 
export default GettingStarted;
