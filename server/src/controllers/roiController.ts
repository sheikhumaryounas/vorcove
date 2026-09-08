import { Request, Response } from 'express';
import { RoiAudit } from '../models/RoiAudit';
import { memoryStore } from '../config/memoryStore';
import { isMongoReady } from '../config/db';

export const calculateRoi = (req: Request, res: Response) => {
  try {
    const { teamSize = 25, projectType = 'ai-ops', hourlyRate = 55, hoursWastedPerWeek = 14 } = req.body;

    const numTeamSize = Number(teamSize);
    const numHourlyRate = Number(hourlyRate);
    const numHoursWasted = Number(hoursWastedPerWeek);

    const weeklyWastedCost = numTeamSize * numHoursWasted * numHourlyRate;
    const annualWastedCost = weeklyWastedCost * 52;

    const efficiencyMultiplier =
      projectType === 'ai-ops' ? 0.72 : projectType === 'pricing' ? 0.85 : projectType === 'data' ? 0.65 : 0.60;

    const estimatedAnnualSavings = Math.round(annualWastedCost * efficiencyMultiplier);
    const estimatedHoursSavedPerMonth = Math.round(numTeamSize * numHoursWasted * 4.33 * efficiencyMultiplier);

    const estimatedInvestment =
      projectType === 'ai-ops' ? 35000 : projectType === 'pricing' ? 45000 : projectType === 'data' ? 40000 : 38000;

    const paybackMonths = Number(((estimatedInvestment / estimatedAnnualSavings) * 12).toFixed(1));

    return res.json({
      success: true,
      data: {
        teamSize: numTeamSize,
        projectType,
        hourlyRate: numHourlyRate,
        hoursWastedPerWeek: numHoursWasted,
        weeklyWastedCost,
        annualWastedCost,
        efficiencyMultiplier,
        estimatedAnnualSavings,
        estimatedHoursSavedPerMonth,
        estimatedInvestment,
        paybackMonths
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to calculate ROI'
    });
  }
};

export const saveRoiAudit = async (req: Request, res: Response) => {
  try {
    const {
      teamSize,
      projectType,
      hourlyRate,
      hoursWastedPerWeek,
      clientName,
      clientEmail,
      clientCompany
    } = req.body;

    const numTeamSize = Number(teamSize || 25);
    const numHourlyRate = Number(hourlyRate || 55);
    const numHoursWasted = Number(hoursWastedPerWeek || 14);
    const projType = projectType || 'ai-ops';

    const weeklyWastedCost = numTeamSize * numHoursWasted * numHourlyRate;
    const annualWastedCost = weeklyWastedCost * 52;
    const efficiencyMultiplier =
      projType === 'ai-ops' ? 0.72 : projType === 'pricing' ? 0.85 : projType === 'data' ? 0.65 : 0.60;

    const estimatedAnnualSavings = Math.round(annualWastedCost * efficiencyMultiplier);
    const estimatedHoursSavedPerMonth = Math.round(numTeamSize * numHoursWasted * 4.33 * efficiencyMultiplier);
    const estimatedInvestment =
      projType === 'ai-ops' ? 35000 : projType === 'pricing' ? 45000 : projType === 'data' ? 40000 : 38000;
    const paybackMonths = Number(((estimatedInvestment / estimatedAnnualSavings) * 12).toFixed(1));

    const auditData = {
      teamSize: numTeamSize,
      projectType: projType,
      hourlyRate: numHourlyRate,
      hoursWastedPerWeek: numHoursWasted,
      annualWastedCost,
      estimatedAnnualSavings,
      estimatedHoursSavedPerMonth,
      estimatedInvestment,
      paybackMonths,
      efficiencyMultiplier,
      clientName: (clientName || '').trim(),
      clientEmail: (clientEmail || '').trim().toLowerCase(),
      clientCompany: (clientCompany || '').trim(),
      status: 'submitted',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let savedAudit;

    if (isMongoReady()) {
      savedAudit = await RoiAudit.create(auditData);
    } else {
      const mockId = 'roi_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      savedAudit = { _id: mockId, id: mockId, ...auditData };
      memoryStore.roiAudits.unshift(savedAudit);
    }

    return res.status(201).json({
      success: true,
      message: 'ROI & Scope proposal generated and saved successfully.',
      data: savedAudit
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to save ROI audit'
    });
  }
};

export const getRoiAudits = async (req: Request, res: Response) => {
  try {
    if (isMongoReady()) {
      const audits = await RoiAudit.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, data: audits });
    } else {
      return res.json({ success: true, data: memoryStore.roiAudits });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch ROI audits'
    });
  }
};
