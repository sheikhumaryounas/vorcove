import { Request, Response } from 'express';
import { ContactInquiry } from '../models/ContactInquiry';
import { RoiAudit } from '../models/RoiAudit';
import { AssistantConversation } from '../models/AssistantConversation';
import { DemoExecution } from '../models/DemoExecution';
import { CaseStudy } from '../models/CaseStudy';
import { memoryStore } from '../config/memoryStore';
import { getDbStatus, isMongoReady } from '../config/db';

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const dbStatus = getDbStatus();

    let totalInquiries = 0;
    let newInquiries = 0;
    let totalAudits = 0;
    let totalEstimatedSavings = 0;
    let totalChatSessions = 0;
    let capturedChatLeads = 0;
    let totalDemoRuns = 0;
    let caseStudiesCount = 0;

    if (isMongoReady()) {
      totalInquiries = await ContactInquiry.countDocuments();
      newInquiries = await ContactInquiry.countDocuments({ status: 'new' });
      totalAudits = await RoiAudit.countDocuments();

      const auditAgg = await RoiAudit.aggregate([
        { $group: { _id: null, totalSavings: { $sum: '$estimatedAnnualSavings' } } }
      ]);
      totalEstimatedSavings = auditAgg[0]?.totalSavings || 0;

      totalChatSessions = await AssistantConversation.countDocuments();
      capturedChatLeads = await AssistantConversation.countDocuments({ status: 'lead_captured' });
      totalDemoRuns = await DemoExecution.countDocuments();
      caseStudiesCount = await CaseStudy.countDocuments();
    } else {
      totalInquiries = memoryStore.inquiries.length;
      newInquiries = memoryStore.inquiries.filter(i => i.status === 'new').length;
      totalAudits = memoryStore.roiAudits.length;
      totalEstimatedSavings = memoryStore.roiAudits.reduce(
        (sum, a) => sum + (Number(a.estimatedAnnualSavings) || 0),
        0
      );
      totalChatSessions = memoryStore.chatSessions.length;
      capturedChatLeads = memoryStore.chatSessions.filter(s => s.status === 'lead_captured').length;
      totalDemoRuns = memoryStore.demoLogs.length;
      caseStudiesCount = memoryStore.caseStudies.length;
    }

    const systemStats = {
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      platform: process.platform,
      dbStatus
    };

    return res.json({
      success: true,
      stats: {
        totalInquiries,
        newInquiries,
        totalAudits,
        totalEstimatedSavings,
        totalChatSessions,
        capturedChatLeads,
        totalDemoRuns,
        caseStudiesCount
      },
      system: systemStats
    });
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch admin stats'
    });
  }
};
